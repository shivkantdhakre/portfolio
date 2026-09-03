"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { sound } from "@/lib/sound";
import { RESUME_DATA } from "@/data/resumeData";
import { 
  X, 
  Download, 
  ExternalLink, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code, 
  CheckCircle2, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles,
  Printer,
  Copy,
  Check,
  Search
} from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface RecruiterModeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "all" | "summary" | "experience" | "projects" | "skills" | "education";

export function RecruiterModeModal({ isOpen, onClose }: RecruiterModeModalProps) {
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const data = RESUME_DATA;

  const handleClose = useCallback(() => {
    sound.playClick();
    setActiveTab("all");
    setSearchQuery("");
    setCopiedField(null);
    onClose();
  }, [onClose]);

  // ESC key listener to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // Lock body scroll when modal is open and restore upon closing
  useEffect(() => {
    if (isOpen) {
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = origOverflow;
      };
    }
  }, [isOpen]);

  // Safe clipboard copy helper
  const copyToClipboard = (text: string, fieldName: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      sound.playSuccess();
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2500);
    } catch {
      // Ignore clipboard permission errors
    }
  };

  const handleTabChange = (tab: TabType) => {
    sound.playClick();
    setActiveTab(tab);
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Filter skills and projects based on search query
  const queryLower = searchQuery.trim().toLowerCase();

  const filteredProjects = useMemo(() => {
    if (!queryLower) return data.projects;
    return data.projects.filter(
      (p) =>
        p.title.toLowerCase().includes(queryLower) ||
        p.overview.toLowerCase().includes(queryLower) ||
        p.tags.some((t) => t.toLowerCase().includes(queryLower)) ||
        p.nodes.some(
          (n) =>
            n.label.toLowerCase().includes(queryLower) ||
            n.tech.toLowerCase().includes(queryLower)
        )
    );
  }, [data.projects, queryLower]);

  const filteredSkillCategories = useMemo(() => {
    if (!queryLower) return data.skillCategories;
    return data.skillCategories
      .map((cat) => ({
        ...cat,
        skills: cat.skills.filter(
          (s) =>
            s.name.toLowerCase().includes(queryLower) ||
            s.category.toLowerCase().includes(queryLower) ||
            s.description.toLowerCase().includes(queryLower)
        ),
      }))
      .filter((cat) => cat.skills.length > 0);
  }, [data.skillCategories, queryLower]);

  const matchesSummary = useMemo(() => {
    if (!queryLower) return true;
    return data.summary.toLowerCase().includes(queryLower);
  }, [data.summary, queryLower]);

  const matchesExperience = useMemo(() => {
    if (!queryLower) return true;
    return (
      data.experience.role.toLowerCase().includes(queryLower) ||
      data.experience.company.toLowerCase().includes(queryLower) ||
      data.experience.summary.toLowerCase().includes(queryLower) ||
      data.experience.missions.some(
        (m) =>
          m.title.toLowerCase().includes(queryLower) ||
          m.challenge.toLowerCase().includes(queryLower) ||
          m.solution.toLowerCase().includes(queryLower) ||
          m.tags.some((t) => t.toLowerCase().includes(queryLower))
      )
    );
  }, [data.experience, queryLower]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl print-modal-container"
      data-lenis-prevent="true"
      onClick={(e) => {
        // Backdrop click dismisses modal
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0e121a] border border-white/20 rounded-2xl shadow-2xl flex flex-col h-[90vh] max-h-[90vh] overflow-hidden my-auto print-modal-card"
        data-lenis-prevent="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 border-b border-white/10 bg-[#121722] shrink-0 no-print">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                  RECRUITER MODE ACTIVATED
                </span>
                <span className="text-xs text-gray-400 font-mono hidden md:inline">
                  (PRESS ESC OR CLICK OUTSIDE TO RETURN)
                </span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight mt-0.5">
                {data.contact.name} — Executive Profile
              </h2>
            </div>
          </div>

          {/* Top Quick Actions */}
          <div className="flex items-center gap-2">
            <a
              href={data.contact.resumeUrl}
              download="Shiv_Kant_Dhakre_Resume.pdf"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playSuccess()}
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">DOWNLOAD RESUME</span>
            </a>

            <button
              onClick={() => {
                sound.playClick();
                setShowPdfViewer(!showPdfViewer);
              }}
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden xs:inline sm:inline">{showPdfViewer ? "HIDE PDF" : "VIEW PDF"}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                window.print();
              }}
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              title="Print or Save Profile as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">PRINT</span>
            </button>

            <button
              onClick={handleClose}
              className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="Close Recruiter Mode (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Recruiter Sub-Header: Search & Quick Copy Toolbar */}
        <div className="bg-[#0b0e15] border-b border-white/10 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 no-print">
          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto text-xs font-mono scrollbar-none py-1">
            {[
              { id: "all", label: "ALL DOSSIER" },
              { id: "summary", label: "SUMMARY" },
              { id: "experience", label: "EXPERIENCE" },
              { id: "projects", label: "PROJECTS" },
              { id: "skills", label: "SKILLS" },
              { id: "education", label: "EDUCATION & HONORS" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as TabType)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-amber-500 text-black font-bold"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ATS Keyword Filter & Quick Copy Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter tech (e.g. Redis, Next.js, Mutex)..."
                className="w-full pl-8 pr-2.5 py-1 text-xs font-mono bg-black/50 border border-white/15 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/70"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Quick ATS Copy Email Button */}
            <button
              onClick={() => copyToClipboard(data.contact.email, "email")}
              onMouseEnter={() => sound.playHover()}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              title="Copy candidate email to ATS"
            >
              {copiedField === "email" ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-amber-400" />
                  <span className="hidden md:inline">COPY EMAIL</span>
                </>
              )}
            </button>

            {/* Quick ATS Copy Summary Button */}
            <button
              onClick={() => copyToClipboard(data.summary, "summary")}
              onMouseEnter={() => sound.playHover()}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 hidden sm:flex"
              title="Copy executive candidate summary"
            >
              {copiedField === "summary" ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-cyan-400" />
                  <span className="hidden md:inline">COPY BIO</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* In-Modal PDF Viewer (Conditional) */}
        {showPdfViewer && (
          <div className="w-full border-b border-white/10 bg-black shrink-0 no-print">
            <div className="w-full h-80 sm:h-96">
              <iframe
                src={`${data.contact.resumeUrl}#toolbar=0`}
                className="w-full h-full border-none"
                title="Shiv Kant Dhakre Resume Preview"
              />
            </div>
            <div className="p-2 bg-black/90 text-center text-[11px] font-mono text-gray-400 border-t border-white/10 flex items-center justify-center gap-3">
              <span>Can&apos;t view the embedded PDF?</span>
              <a
                href={data.contact.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                Open PDF in new tab <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* Scrollable Executive Dossier Body */}
        <div
          ref={modalBodyRef}
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 md:p-8 space-y-8 font-sans overscroll-contain print-modal-body"
        >
          {/* Quick 60-Second Executive Summary Banner */}
          {(activeTab === "all" || activeTab === "summary") && matchesSummary && (
            <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/10 via-white/5 to-cyan-500/10 border border-amber-500/20 space-y-2 print-break-inside-avoid">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>60-Second Executive Summary</span>
                </div>
                <button
                  onClick={() => copyToClipboard(data.summary, "summary-banner")}
                  className="text-[11px] font-mono text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer no-print"
                >
                  {copiedField === "summary-banner" ? (
                    <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> Copied</span>
                  ) : (
                    <span className="flex items-center gap-1"><Copy className="w-3 h-3" /> Copy</span>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-200 leading-relaxed">
                {data.summary}
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-gray-300">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  Production Concurrency &amp; Mutex Engine
                </span>
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  Multi-Tenant ERP + Expo Mobile
                </span>
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  NestJS + BullMQ + Redis + Gemini AI
                </span>
                <span className="flex items-center gap-1.5 text-purple-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  NSS Secretary (MMMUT)
                </span>
              </div>
            </div>
          )}

          {/* Quick Contact Line */}
          {(activeTab === "all" || activeTab === "summary") && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono print-break-inside-avoid">
              <div
                onClick={() => copyToClipboard(data.contact.email, "email-card")}
                className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between text-gray-300 hover:border-amber-500/40 transition-colors cursor-pointer group"
                title="Click to copy email"
              >
                <div className="flex items-center gap-2 truncate">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">{data.contact.email}</span>
                </div>
                <span className="text-[10px] text-gray-500 group-hover:text-amber-400 no-print">
                  {copiedField === "email-card" ? "COPIED" : "COPY"}
                </span>
              </div>

              <div
                onClick={() => copyToClipboard(data.contact.phone, "phone-card")}
                className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between text-gray-300 hover:border-cyan-500/40 transition-colors cursor-pointer group"
                title="Click to copy phone number"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{data.contact.phone}</span>
                </div>
                <span className="text-[10px] text-gray-500 group-hover:text-cyan-400 no-print">
                  {copiedField === "phone-card" ? "COPIED" : "COPY"}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{data.contact.location}</span>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-center gap-3">
                <a
                  href={data.contact.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline flex items-center gap-1"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
                </a>
                <a
                  href={data.contact.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:underline flex items-center gap-1"
                >
                  <GithubIcon className="w-3.5 h-3.5" /> GitHub
                </a>
              </div>
            </div>
          )}

          {/* Professional Experience Section */}
          {(activeTab === "all" || activeTab === "experience") && matchesExperience && (
            <div className="space-y-4 print-break-inside-avoid">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <span>Professional Work Experience</span>
                </h3>
                <span className="text-xs font-mono text-gray-400">{data.experience.period}</span>
              </div>

              <div className="p-5 rounded-xl bg-[#111622] border border-white/10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {data.experience.role} — {data.experience.company}
                    </h4>
                    <p className="text-xs text-amber-400 font-mono mt-0.5">
                      Live Production Concurrency, Multi-Tenant Architecture &amp; Mobile Release Gates
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    INTERNSHIP
                  </span>
                </div>

                <ul className="space-y-2 text-xs text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>
                      <strong>Multi-Tenant ERP:</strong> Architected from scratch covering inventory, multi-branch, and ledger management with GST/E-Way billing and dual-format (A4/Thermal) receipt generation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span>
                      <strong>Token-Refresh Concurrency Engine:</strong> Root-caused repeated logout bug in live ride-hailing app, engineering unified refresh engine with mutex request locking and queued retries.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>
                      <strong>Offline Sync Integrity &amp; CI/CD:</strong> Implemented OTA-safe pure-JS UUID generator and retry logic; established repository&apos;s first CI/CD gates via Husky and GitHub Actions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                    <span>
                      <strong>Real-Time Communication:</strong> Shipped Broadcast &amp; Notification Management System on Admin Dashboard for instant rider/driver alerts.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 shrink-0" />
                    <span>
                      <strong>Home-Services Booking:</strong> Built complete instant &amp; appointment booking system with Ratings/Reviews, FCM push notifications, and Wallet/Bank Account disbursement.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Key Projects Section */}
          {(activeTab === "all" || activeTab === "projects") && filteredProjects.length > 0 && (
            <div className="space-y-4 print-break-inside-avoid">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Code className="w-4 h-4 text-cyan-400" />
                  <span>Featured Engineering Projects</span>
                </h3>
                <span className="text-xs font-mono text-gray-400">
                  {filteredProjects.length} PRODUCTION ARCHITECTURES
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl bg-[#111622] border border-white/10 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                        <span className="text-amber-400 font-bold">{proj.title}</span>
                        <span>{proj.date}</span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">{proj.overview}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <div className="flex flex-wrap gap-1">
                        {proj.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Matrix */}
          {(activeTab === "all" || activeTab === "skills") && filteredSkillCategories.length > 0 && (
            <div className="space-y-4 print-break-inside-avoid">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Technical Skills Matrix</span>
                </h3>
                <button
                  onClick={() => {
                    const allSkills = data.skillCategories
                      .flatMap((c) => c.skills.map((s) => s.name))
                      .join(", ");
                    copyToClipboard(allSkills, "skills-all");
                  }}
                  className="text-xs font-mono text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer no-print"
                >
                  {copiedField === "skills-all" ? (
                    <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> Copied Skills</span>
                  ) : (
                    <span className="flex items-center gap-1"><Copy className="w-3 h-3" /> Copy Tech Stack</span>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredSkillCategories.map((cat) => (
                  <div
                    key={cat.title}
                    className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-2"
                  >
                    <div className="text-xs font-mono font-bold text-amber-400">{cat.title}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s) => (
                        <span
                          key={s.name}
                          className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                            s.featured
                              ? "bg-amber-500/20 text-amber-200 border border-amber-500/40"
                              : "bg-white/5 text-gray-300"
                          }`}
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education & Verified Achievements */}
          {(activeTab === "all" || activeTab === "education") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 print-break-inside-avoid">
              {/* Education */}
              <div className="p-4 rounded-xl bg-[#111622] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
                  <GraduationCap className="w-4 h-4" />
                  <span>Formal Education</span>
                </div>
                <h4 className="text-sm font-bold text-white">{data.education.degree}</h4>
                <p className="text-xs text-gray-300">{data.education.institution}</p>
                <div className="flex items-center gap-4 text-xs font-mono text-gray-400 pt-1">
                  <span>PERIOD: {data.education.period}</span>
                  <span className="text-emerald-400 font-bold">CGPA: {data.education.cgpa}</span>
                </div>
              </div>

              {/* Achievements */}
              <div className="p-4 rounded-xl bg-[#111622] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
                  <Award className="w-4 h-4" />
                  <span>Verified Milestones</span>
                </div>
                <div className="space-y-1.5 text-xs text-gray-300 font-sans">
                  <div>
                    <strong>3rd Place:</strong> Flip Flop Duo Coding (ENNEXUS&apos;24)
                  </div>
                  <div>
                    <strong>Certificate:</strong> Technical Coordination (IIMS-2025 by Dept. of Civil Engineering)
                  </div>
                  <div>
                    <strong>AIR 61,134:</strong> Joint Entrance Examination (JEE) Mains 2023
                  </div>
                  <div>
                    <strong>DSA Mastery:</strong> Advanced algorithmic patterns in C++
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* No search results fallback */}
          {queryLower &&
            !matchesSummary &&
            !matchesExperience &&
            filteredProjects.length === 0 &&
            filteredSkillCategories.length === 0 && (
              <div className="p-8 text-center space-y-3 font-mono text-xs text-gray-400">
                <p>No sections match your search &ldquo;{searchQuery}&rdquo;</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-3 py-1.5 rounded bg-amber-500 text-black font-bold cursor-pointer"
                >
                  Clear Search Filter
                </button>
              </div>
            )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#121722] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-gray-400 shrink-0 no-print">
          <span>SHIV KANT DHAKRE // AUTHORITATIVE RESUME DATA</span>
          <div className="flex items-center gap-3">
            <a
              href={data.contact.resumeUrl}
              download="Shiv_Kant_Dhakre_Resume.pdf"
              className="text-amber-400 hover:underline flex items-center gap-1"
            >
              <Download className="w-3 h-3" /> Download PDF
            </a>
            <button
              onClick={handleClose}
              className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

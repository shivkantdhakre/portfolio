"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { RESUME_DATA } from "@/data/resumeData";
import confetti from "canvas-confetti";
import { FadeIn } from "@/components/motion/FadeIn";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { 
  Mail, 
  Phone, 
  MapPin, 
  FileDown, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowUpRight,
  Briefcase
} from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface ContactSectionProps {
  onOpenRecruiter: () => void;
}

export function ContactSection({ onOpenRecruiter }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const contact = RESUME_DATA.contact;

  const copyEmail = () => {
    sound.playSuccess();
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(contact.email);
      }
    } catch {
      // Ignore clipboard permission errors
    }
    setCopiedEmail(true);
    triggerConfetti();
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const copyPhone = () => {
    sound.playSuccess();
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(contact.phone);
      }
    } catch {
      // Ignore clipboard permission errors
    }
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 3000);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.85 },
        colors: ["#F59E0B", "#06B6D4", "#10B981"],
      });
    } catch {
      // Ignored
    }
  };

  return (
    <section id="chapter-contact" className="relative w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Chapter Marker */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-12">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl font-mono font-extrabold text-amber-500 tracking-tighter">
            06
          </span>
          <div className="h-7 w-[1px] bg-white/20" />
          <div className="space-y-0.5">
            <span className="text-xs font-mono font-bold tracking-widest text-white uppercase block">
              LET&apos;S BUILD
            </span>
            <span className="text-[10px] font-mono text-gray-400 tracking-wider">
              COMMUNICATION CONSOLE &amp; DIRECT DISPATCH
            </span>
          </div>
        </div>

        <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
          DISPATCH READY
        </span>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Editorial Statement */}
        <FadeIn direction="left" distance={24} className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase font-sans">
              Ready To Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">
                Something Resilient?
              </span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans pt-2">
              Whether you are architecting a distributed backend, scaling AI workflows, or building an 
              enterprise mobile system that can&apos;t afford to drop sessions in production — let&apos;s talk.
            </p>
          </div>

          {/* Quick Info Badges */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-xs font-mono text-gray-300">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{contact.location}</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-gray-300">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Available for Full-Stack, Backend &amp; AI Engineering Roles</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-4">
            <MagneticButton strength={0.25}>
              <a
                href={`mailto:${contact.email}`}
                className="px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-500/25 tracking-wider whitespace-nowrap"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>INITIATE EMAIL DISPATCH</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </a>
            </MagneticButton>

            <MagneticButton strength={0.2} onClick={onOpenRecruiter}>
              <div className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono font-bold text-xs flex items-center gap-2 transition-all cursor-pointer tracking-wider whitespace-nowrap">
                <Briefcase className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>ENTER RECRUITER MODE</span>
              </div>
            </MagneticButton>
          </div>
        </FadeIn>

        {/* Right Cybernetic Terminal Box */}
        <FadeIn direction="right" distance={24} className="lg:col-span-6">
          <div className="bg-[#0a0d14] border border-white/15 rounded-xl p-6 font-mono space-y-6 shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-gray-300 font-bold">DISPATCH_CONSOLE.SH</span>
            </div>
            <span className="text-[10px] text-emerald-400">STATUS: ONLINE</span>
          </div>

          {/* Contact Direct Copy Cards */}
          <div className="space-y-3">
            {/* Email Card */}
            <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-between group hover:border-amber-500/50 transition-colors">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400" />
                <div>
                  <div className="text-[10px] text-gray-500">PRIMARY_EMAIL</div>
                  <div className="text-xs text-white font-bold">{contact.email}</div>
                </div>
              </div>
              <button
                onClick={copyEmail}
                onMouseEnter={() => sound.playHover()}
                className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-between group hover:border-cyan-500/50 transition-colors">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="text-[10px] text-gray-500">DIRECT_TELEPHONE</div>
                  <div className="text-xs text-white font-bold">{contact.phone}</div>
                </div>
              </div>
              <button
                onClick={copyPhone}
                onMouseEnter={() => sound.playHover()}
                className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>

            {/* Official Resume Direct Download */}
            <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-between group hover:border-emerald-500/50 transition-colors">
              <div className="flex items-center gap-3">
                <FileDown className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-[10px] text-gray-500">OFFICIAL_RESUME_PDF</div>
                  <div className="text-xs text-white font-bold">Shiv_Kant_Dhakre_Resume.pdf</div>
                </div>
              </div>
              <a
                href={contact.resumeUrl}
                download="Shiv_Kant_Dhakre_Resume.pdf"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="px-3 py-1.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] flex items-center gap-1.5 border border-emerald-500/40 transition-colors"
              >
                <FileDown className="w-3 h-3" />
                <span>DOWNLOAD</span>
              </a>
            </div>
          </div>

          {/* External Social Profiles */}
          <div className="pt-2 flex items-center gap-3">
            <MagneticButton strength={0.1} className="flex-1">
              <a
                href={contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-2.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 text-xs text-gray-300 hover:text-white transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>LINKEDIN</span>
              </a>
            </MagneticButton>

            <MagneticButton strength={0.1} className="flex-1">
              <a
                href={contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-2.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 text-xs text-gray-300 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5 text-gray-200" />
                <span>GITHUB</span>
              </a>
            </MagneticButton>
          </div>
        </div>
        </FadeIn>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { RESUME_DATA } from "@/data/resumeData";
import { ChapterTransition, ChapterHeading } from "@/components/motion/ChapterTransition";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import {
  Users,
  Award,
  ChevronRight,
  Workflow,
  HeartHandshake,
} from "lucide-react";

interface CommunityNode {
  id: string;
  name: string;
  role: string;
  category: "Leadership" | "Mentorship" | "Outreach" | "Conference";
  highlight: string;
  detail: string;
  connections: string[];
}

const COMMUNITY_NODES: CommunityNode[] = [
  {
    id: "pararth",
    name: "PARARTH'26",
    role: "Flagship University Initiative",
    category: "Leadership",
    highlight: "Cross-Functional Direction",
    detail:
      "Directed multi-departmental teams executing large-scale campus initiatives, ensuring resource alignment, stage logistics, and volunteer readiness.",
    connections: ["nss-core", "mentorship"],
  },
  {
    id: "goonj",
    name: "GOONJ'26",
    role: "Cultural & Community Gathering",
    category: "Leadership",
    highlight: "Logistical Coordination",
    detail:
      "Coordinated volunteer pipelines, resolved on-ground bottlenecks, and ensured seamless scheduling across concurrent event tracks.",
    connections: ["nss-core", "outreach"],
  },
  {
    id: "workshops",
    name: "Digital Skill Workshops",
    role: "Technical Literacy Initiative",
    category: "Mentorship",
    highlight: "Student Digital Proficiency",
    detail:
      "Spearheaded technical workshops training university cohorts in modern digital tools, problem-solving methodologies, and computer literacy.",
    connections: ["mentorship", "nss-core"],
  },
  {
    id: "outreach",
    name: "Community Outreach & Education",
    role: "Structured Programs",
    category: "Outreach",
    highlight: "Social Impact & Engagement",
    detail:
      "Led community outreach operations and structured educational initiatives, driving volunteer engagement and establishing verified documentation pipelines.",
    connections: ["nss-core", "pararth"],
  },
  {
    id: "iims",
    name: "IIMS-2025 Conference",
    role: "Technical Co-ordinator",
    category: "Conference",
    highlight: "International Research Infrastructure",
    detail:
      "Architected the official conference portal, managed global paper submissions, and received an official Certificate of Appreciation from the Dept. of Civil Engineering.",
    connections: ["workshops", "nss-core"],
  },
];

export function HumanSection() {
  const [selectedNode, setSelectedNode] = useState<CommunityNode>(
    COMMUNITY_NODES[0],
  );

  return (
    <section
      id="chapter-human"
      className="relative w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10"
    >
      {/* Chapter Marker */}
      <ChapterTransition
        number="04"
        title="THE HUMAN"
        subtitle="COMMUNITY LEADERSHIP, MENTORSHIP & COLLABORATION"
        badge="NSS SECRETARY // MMMUT"
        badgeTone="rose"
      />

      {/* Section Title & Philosophy */}
      <div className="max-w-4xl space-y-4 mb-12">
        <ChapterHeading chapter="04" telemetry="CONSTELLATION // NSS_LEADERSHIP">
          &ldquo;Code Builds Systems. <br />
          <span className="text-rose-400">
            People Build Communities.&rdquo;
          </span>
        </ChapterHeading>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
          High-performing software engineers do not exist in silos. As Secretary
          of the National Service Scheme (NSS) Cell at MMMUT, Shiv Kant leads
          cross-functional teams, mentors incoming students in algorithmic
          problem-solving, and coordinates university-scale programs and
          international conference research infrastructure.
        </p>
      </div>

      {/* Interactive Constellation / Community Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Network Nodes Grid */}
        <div className="lg:col-span-7 space-y-3">
          {/* Central Secretary Anchor Banner */}
          <div className="p-4 rounded-xl bg-[#0e131d] border border-rose-500/30 flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
              <div>
                <div className="text-xs font-mono font-bold text-white tracking-tight">
                  SHIV KANT DHAKRE — SECRETARY
                </div>
                <div className="text-[11px] font-mono text-rose-300/80">
                  NATIONAL SERVICE SCHEME (NSS) CELL, MMMUT
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 font-semibold">
              07/2025 – PRESENT
            </span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">
              Leadership &amp; Community Initiatives:
            </span>
            <span className="text-[11px] font-mono text-rose-400 font-semibold">
              5 VERIFIED IMPACT AREAS
            </span>
          </div>

          <StaggerGroup
            staggerInterval={0.06}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {COMMUNITY_NODES.map((node) => {
              const isSelected = selectedNode.id === node.id;

              return (
                <StaggerItem key={node.id}>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setSelectedNode(node);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer focus-ring-emerald ${
                      isSelected
                        ? "bg-emerald-950/40 border-emerald-500/80 shadow-lg shadow-emerald-500/10"
                        : "bg-[#0b0e15] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                      <span className="text-emerald-400 font-bold">
                        {node.category}
                      </span>
                      <span className="text-gray-500">INITIATIVE</span>
                    </div>
                    <h4 className="text-base font-bold text-white tracking-tight">
                      {node.name}
                    </h4>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {node.role}
                    </div>
                    <div className="text-[11px] font-mono text-gray-400 mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                      <span>{node.highlight}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-50 text-emerald-400" />
                    </div>
                  </button>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>

        {/* Node Deep Dive Inspector Card */}
        <div className="lg:col-span-5 bg-[#0e131d] border border-white/10 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                  LEADERSHIP_DOSSIER // {selectedNode.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedNode.name}
                </h3>
                <span className="text-xs font-mono text-gray-400">
                  {selectedNode.role}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-2">
              <span className="text-xs font-mono text-emerald-400 tracking-wider font-bold block">
                IMPACT &amp; RESPONSIBILITIES:
              </span>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-sans">
                {selectedNode.detail}
              </p>
            </div>

            <div className="space-y-2.5">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">
                Leadership Competencies Demonstrated:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Cross-Functional Team Direction",
                  "Digital Documentation Governance",
                  "Cohort Mentorship",
                  "Incident & Logistics Mitigation",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/5 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-500">
            <span className="flex items-center gap-1.5 text-gray-400">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
              MMMUT NSS CELL
            </span>
            <span className="text-emerald-400/80">07/2025 – PRESENT</span>
          </div>
        </div>
      </div>

      {/* Leadership Roles Full Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RESUME_DATA.leadership.map((role) => (
          <div
            key={role.title}
            className="manga-panel rounded-xl p-6 bg-[#0c1018] border border-white/10 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block font-semibold">
                  {role.period}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  {role.title}
                </h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">
                  {role.organization}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-gray-300 font-sans">
              {role.bullets.map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {role.impactPoints.map((pt) => (
                <div
                  key={pt.label}
                  className="p-2.5 rounded bg-white/[0.02] border border-white/5"
                >
                  <div className="text-xs font-bold text-emerald-400 font-mono">
                    {pt.metric}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {pt.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

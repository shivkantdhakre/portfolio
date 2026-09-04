"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { 
  Layers, 
  Server, 
  Database, 
  Cpu, 
  BrainCircuit, 
  ShieldCheck, 
  ArrowRight,
  Terminal,
  Activity
} from "lucide-react";

interface LayerNode {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  glowClass: string;
  technologies: { name: string; detail: string; roleTag?: string }[];
  streamRole: string;
  pipelineInsight: string;
}

const ECOSYSTEM_LAYERS: LayerNode[] = [
  {
    id: "frontend",
    name: "01 / CLIENT & MOBILE INTERACTION",
    subtitle: "Web Dashboard + Cross-Platform Mobile",
    icon: Layers,
    color: "#06B6D4",
    glowClass: "border-cyan-500/40 text-cyan-400",
    technologies: [
      { name: "Next.js (App Router)", detail: "Server-side rendering, streaming HTML, layout memoization & SEO optimization", roleTag: "Web Client" },
      { name: "React Native & Expo", detail: "Multi-tenant mobile ERP client, gesture handlers, and OTA updates", roleTag: "Mobile Client" },
      { name: "TypeScript", detail: "Strict end-to-end interface contracts between frontends and backend DTOs", roleTag: "Type Safety" },
      { name: "Tailwind CSS & Vanilla CSS", detail: "Calibrated design tokens, fluid clamp typography, and micro-interactions", roleTag: "Design System" },
    ],
    streamRole: "INGESTION & TELEMETRY",
    pipelineInsight: "Handles user intents, optimistic UI mutations, and real-time WebSocket event streams without layout shifts or unhandled promise rejections.",
  },
  {
    id: "backend",
    name: "02 / APPLICATION ENGINE",
    subtitle: "High-Throughput Modular Microservices",
    icon: Server,
    color: "#F59E0B",
    glowClass: "border-amber-500/40 text-amber-400",
    technologies: [
      { name: "NestJS (TypeScript)", detail: "Modular enterprise architecture, DTO validation pipes, dependency injection", roleTag: "Core Framework" },
      { name: "Node.js (Async Event-Loop)", detail: "High-concurrency ride-hailing handlers and non-blocking booking engines", roleTag: "Runtime Engine" },
      { name: "FastAPI (Python)", detail: "High-speed asynchronous endpoints for machine learning and PDF chunking", roleTag: "AI Gateway" },
    ],
    streamRole: "BUSINESS LOGIC & CONCURRENCY",
    pipelineInsight: "Resolves token race conditions via mutex request locking, coordinates multi-branch tenant ledgers, and dispatches real-time broadcast push notifications.",
  },
  {
    id: "data",
    name: "03 / DATA PERSISTENCE & QUEUES",
    subtitle: "ACID Storage, In-Memory Caching & Async Queues",
    icon: Database,
    color: "#10B981",
    glowClass: "border-emerald-500/40 text-emerald-400",
    technologies: [
      { name: "PostgreSQL & Prisma ORM", detail: "Relational persistence, nested transactions, strict schema migrations", roleTag: "Primary Storage" },
      { name: "Redis", detail: "Centralized latency cache, session store, distributed mutex locks", roleTag: "In-Memory Cache" },
      { name: "BullMQ", detail: "Asynchronous job scheduler for Lighthouse audits and batch processing", roleTag: "Worker Queues" },
      { name: "MongoDB", detail: "Flexible document storage for audit history logs and catalog models", roleTag: "Document Store" },
    ],
    streamRole: "ATOMIC PERSISTENCE",
    pipelineInsight: "Ensures sub-millisecond cached responses and delegates heavy computational tasks to background worker pools without blocking the Node.js event loop.",
  },
  {
    id: "infrastructure",
    name: "04 / INFRASTRUCTURE & AUTOMATION",
    subtitle: "Continuous Integration & Deployment Gates",
    icon: Cpu,
    color: "#8B5CF6",
    glowClass: "border-purple-500/40 text-purple-400",
    technologies: [
      { name: "GitHub Actions", detail: "Automated linting, type-checking, and production build release pipelines", roleTag: "CI/CD Pipeline" },
      { name: "Husky Pre-Commit", detail: "Strict repository commit gates and pre-push static code analysis", roleTag: "Quality Gate" },
      { name: "OTA-Safe Pure-JS Engines", detail: "Pure JavaScript UUID generators preventing runtime crashes on mobile", roleTag: "Mobile Reliability" },
      { name: "Docker / Production Staging", detail: "Reproducible container runtimes and staged rollout verification", roleTag: "Containerization" },
    ],
    streamRole: "RELEASE GATES & RELIABILITY",
    pipelineInsight: "Guarantees zero defective builds or missing native dependencies hit production across ride-hailing and ERP deployments.",
  },
  {
    id: "ai",
    name: "05 / MACHINE INTELLIGENCE",
    subtitle: "NLP Pipelines, Zero-Shot & Actionable AI",
    icon: BrainCircuit,
    color: "#EC4899",
    glowClass: "border-pink-500/40 text-pink-400",
    technologies: [
      { name: "Hugging Face (BART/BERT)", detail: "Zero-shot classification and Named Entity Recognition (NER)", roleTag: "Transformer Models" },
      { name: "Custom Chunking Algorithm", detail: "Sliding-window algorithm bypassing 512-token constraints for 50+ page contracts", roleTag: "NLP Engineering" },
      { name: "Retrieval-Augmented Generation", detail: "Contextually grounded document analysis and risk scoring", roleTag: "RAG Pipeline" },
      { name: "Gemini AI API", detail: "Translates raw Lighthouse performance audits into executive developer remediation plans", roleTag: "Synthesis Engine" },
    ],
    streamRole: "REASONING & SYNTHESIS",
    pipelineInsight: "Extracts contractual risk liabilities and synthesizes developer optimization playbooks from raw telemetry datasets.",
  },
  {
    id: "security",
    name: "06 / SECURITY & IDENTITY",
    subtitle: "Stateless Authentication & Session Protection",
    icon: ShieldCheck,
    color: "#3B82F6",
    glowClass: "border-blue-500/40 text-blue-400",
    technologies: [
      { name: "OAuth 2.0 & JWT Rotation", detail: "Stateless security with protected access & refresh tokens", roleTag: "Authentication" },
      { name: "Request Locking Mutex", detail: "Prevents concurrent token refresh race condition and unexpected driver logouts", roleTag: "Concurrency Mutex" },
      { name: "Multi-Tenant Isolation", detail: "Guarantees tenant data separation and branch ledger integrity across ERP systems", roleTag: "Tenant Security" },
    ],
    streamRole: "DEFENSE & ACCESS GOVERNANCE",
    pipelineInsight: "Guarantees session survivability under adverse network switching, rapid token expiration, and concurrent trip state updates.",
  },
];

export function EcosystemMap() {
  const [activeLayer, setActiveLayer] = useState<string>("backend");

  const currentLayer = ECOSYSTEM_LAYERS.find((l) => l.id === activeLayer) || ECOSYSTEM_LAYERS[1];

  return (
    <div className="w-full relative mt-12 bg-[#0a0d14]/80 border border-white/10 rounded-xl p-6 md:p-8 backdrop-blur-md overflow-hidden panel-anchor">
      {/* Editorial Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>INTERACTIVE_SYSTEM_ARCHITECTURE // ECOSYSTEM_MAP</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-1">
            Connected Engineering Pipeline
          </h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
          <Activity className="w-3 h-3 text-amber-400" />
          <span>INTERACTIVE SYSTEM TOPOLOGY</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Layer Selector Pipeline */}
        <div className="lg:col-span-5 space-y-3">
          <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">
            Select System Layer to Inspect Flow:
          </p>

          <div className="space-y-2.5">
            {ECOSYSTEM_LAYERS.map((layer) => {
              const Icon = layer.icon;
              const isSelected = activeLayer === layer.id;

              return (
                <button
                  key={layer.id}
                  id={`ecosystem-btn-${layer.id}`}
                  onClick={() => {
                    sound.playClick();
                    setActiveLayer(layer.id);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between group cursor-pointer focus-ring-amber ${
                    isSelected
                      ? `bg-white/10 ${layer.glowClass} shadow-lg shadow-black/40`
                      : "bg-[#0f141e]/60 border-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-md transition-colors ${
                        isSelected ? "bg-white/10 text-white" : "bg-black/40 text-gray-400 group-hover:text-gray-200"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-semibold tracking-wider">
                        {layer.name}
                      </div>
                      <div className="text-xs text-gray-400 line-clamp-1">{layer.subtitle}</div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? "translate-x-1" : "opacity-30 group-hover:opacity-70"
                    }`}
                    style={isSelected ? { color: layer.color } : undefined}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Deep Dive Telemetry Panel */}
        <div
          className="lg:col-span-7 flex flex-col justify-between bg-[#0e121b] border rounded-xl p-6 relative transition-colors duration-300"
          style={{ borderColor: `${currentLayer.color}30` }}
        >
          <div className="space-y-6">
            {/* Header Telemetry */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[11px] font-mono text-gray-400 tracking-widest uppercase">
                  SYSTEM_TELEMETRY // {currentLayer.streamRole}
                </span>
                <h4 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                  <currentLayer.icon className="w-5 h-5" style={{ color: currentLayer.color }} />
                  {currentLayer.subtitle}
                </h4>
              </div>
              <span
                className="px-2.5 py-1 text-xs font-mono bg-white/5 border rounded"
                style={{ borderColor: `${currentLayer.color}40`, color: currentLayer.color }}
              >
                ACTIVE_NODE
              </span>
            </div>

            {/* Architectural Role */}
            <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
              <span
                className="text-xs font-mono tracking-wider font-bold block"
                style={{ color: currentLayer.color }}
              >
                ENGINEERING RATIONALE &amp; DATA FLOW:
              </span>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                {currentLayer.pipelineInsight}
              </p>
            </div>

            {/* Technologies Verified on Resume */}
            <div>
              <span className="text-xs font-mono text-gray-400 tracking-wider uppercase block mb-3 font-semibold">
                Verified Production Technologies:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentLayer.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="p-3 rounded-lg bg-white/[0.03] border border-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-white mb-1">
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: currentLayer.color }}
                        />
                        {tech.name}
                      </span>
                      {tech.roleTag && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/5 text-gray-400 font-normal">
                          {tech.roleTag}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-gray-400 leading-snug">
                      {tech.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Simulated Stream */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-500">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              PROVEN AT SCALE (GROWW YOU &amp; ENTERPRISE ERP)
            </span>
            <span>SHIV KANT DHAKRE // PRODUCTION VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
}

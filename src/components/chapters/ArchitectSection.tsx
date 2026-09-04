"use client";

import React, { useState, useRef, useEffect } from "react";
import { sound } from "@/lib/sound";
import { RESUME_DATA, ArchitectureNode } from "@/data/resumeData";
import { ChapterTransition, ChapterHeading } from "@/components/motion/ChapterTransition";
import { FadeIn } from "@/components/motion/FadeIn";
import { 
  SearchCheck, 
  FileText, 
  Zap, 
  Info,
  CheckCircle,
  Play,
  ArrowRight,
  Split,
  Activity
} from "lucide-react";

export function ArchitectSection() {
  const [selectedProject, setSelectedProject] = useState<string>("seo-health-scanner");
  const project = RESUME_DATA.projects.find((p) => p.id === selectedProject) || RESUME_DATA.projects[0];

  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(project.nodes[0]);
  const [isSimulatingAudit, setIsSimulatingAudit] = useState(false);
  const [auditStep, setAuditStep] = useState<number>(0);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const handleSelectProject = (projId: string) => {
    sound.playClick();
    clearTimers();
    setSelectedProject(projId);
    const newProj = RESUME_DATA.projects.find((p) => p.id === projId) || RESUME_DATA.projects[0];
    setSelectedNode(newProj.nodes[0]);
    setIsSimulatingAudit(false);
    setAuditStep(0);
  };

  const runPipelineSimulation = () => {
    sound.playClick();
    clearTimers();
    setIsSimulatingAudit(true);
    setAuditStep(1);

    const stepsCount = project.pipeline.length;
    for (let i = 1; i <= stepsCount; i++) {
      const id = setTimeout(() => {
        setAuditStep(i);
        if (i === stepsCount) {
          setIsSimulatingAudit(false);
          sound.playSuccess();
        }
      }, i * 850);
      timerRefs.current.push(id);
    }
  };

  return (
    <section id="chapter-architect" className="relative w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Chapter Marker */}
      <ChapterTransition
        number="03"
        title="THE ARCHITECT & LABS"
        subtitle="DISTRIBUTED SYSTEMS & APPLIED MACHINE LEARNING"
        badge="PROVEN DESIGN PATTERNS"
        badgeTone="cyan"
      />

      {/* Section Title */}
      <div className="max-w-4xl space-y-4 mb-10">
        <ChapterHeading chapter="03" telemetry="SYS_BLUEPRINT // DISTRIBUTED_ML">
          SYSTEM ARCHITECTURE LAB. <br />
          <span className="text-cyan-400">BLUEPRINTS &amp; PIPELINES.</span>
        </ChapterHeading>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
          Interactive distributed systems and machine learning workflows. Select nodes to inspect 
          data-flow contracts, failure modes, and optimization trade-offs.
        </p>
      </div>

      {/* Project Selector Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => handleSelectProject("seo-health-scanner")}
          onMouseEnter={() => sound.playHover()}
          className={`px-5 py-3 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer focus-ring-cyan ${
            selectedProject === "seo-health-scanner"
              ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
              : "bg-white/[0.04] border border-white/10 text-gray-300 hover:border-white/25"
          }`}
        >
          <SearchCheck className="w-4 h-4" />
          <span>PROJECT 01: SEO HEALTH SCANNER (NESTJS + BULLMQ + GEMINI)</span>
        </button>

        <button
          onClick={() => handleSelectProject("legal-risk-analyzer")}
          onMouseEnter={() => sound.playHover()}
          className={`px-5 py-3 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer focus-ring-amber ${
            selectedProject === "legal-risk-analyzer"
              ? "bg-amber-500 text-black shadow-lg shadow-amber-500/15"
              : "bg-white/[0.04] border border-white/10 text-gray-300 hover:border-white/25"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>PROJECT 02: AI LEGAL RISK ANALYZER (HUGGING FACE + CHUNKING)</span>
        </button>
      </div>

      {/* Main Architecture Interactive Lab */}
      <div className="bg-[#0b0f17]/75 border border-white/15 rounded-2xl p-6 md:p-8 backdrop-blur-xl space-y-8 shadow-2xl panel-anchor">
        {/* Project Header Overview */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-1 max-w-2xl">
            <span className="text-xs font-mono text-cyan-400 tracking-wider">
              {project.date} {"//"} ARCHITECTURE BLUEPRINT
            </span>
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
              {project.overview}
            </p>
          </div>

          <button
            onClick={runPipelineSimulation}
            disabled={isSimulatingAudit}
            onMouseEnter={() => sound.playHover()}
            className="px-5 py-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-mono text-xs flex items-center gap-2 transition-all cursor-pointer focus-ring-cyan"
          >
            <Play className={`w-3.5 h-3.5 text-cyan-400 ${isSimulatingAudit ? "animate-spin" : "fill-cyan-400"}`} />
            <span>{isSimulatingAudit ? "SIMULATING PIPELINE FLOW..." : "ANIMATE SYSTEM PIPELINE"}</span>
          </button>
        </div>

        {/* Dynamic Architectural Dataflow Strip */}
        <div className="p-4 rounded-xl bg-black/50 border border-white/10 text-xs font-mono">
          <div className="text-[10px] text-gray-400 mb-2 uppercase tracking-wider flex items-center justify-between">
            <span>LIVE DATA-FLOW TOPOLOGY</span>
            {isSimulatingAudit && (
              <span className="text-cyan-400 flex items-center gap-1 font-semibold">
                <Activity className="w-3 h-3 animate-pulse" />
                PACKET IN TRANSIT: STAGE {auditStep}
              </span>
            )}
          </div>

          {selectedProject === "seo-health-scanner" ? (
            /* SEO Scanner Pipeline */
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: "Target URL", sub: "User Input" },
                { label: "Next.js UI", sub: "Client" },
                { label: "NestJS API", sub: "Gateway" },
                { label: "BullMQ", sub: "Queue" },
                { label: "Redis", sub: "Cache/Lock" },
                { label: "Lighthouse API", sub: "Compute" },
                { label: "Gemini AI", sub: "Synthesis" },
                { label: "Prisma / DB", sub: "Report" },
              ].map((step, idx, arr) => (
                <React.Fragment key={step.label}>
                  <div className={`px-2.5 py-1.5 rounded border transition-all ${
                    auditStep === idx + 1
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-200 font-bold scale-105"
                      : auditStep > idx + 1
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-white/[0.03] border-white/10 text-gray-400"
                  }`}>
                    <span className="block text-[11px] text-white">{step.label}</span>
                    <span className="block text-[9px] text-gray-400">{step.sub}</span>
                  </div>
                  {idx < arr.length - 1 && <ArrowRight className="w-3 h-3 text-gray-600 shrink-0" />}
                </React.Fragment>
              ))}
            </div>
          ) : (
            /* Legal AI Pipeline with Sliding-Window Chunking */
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: "PDF Document", sub: "50+ Pages" },
                { label: "Text Extraction", sub: "PyPDF/OCR" },
                { label: "Custom Chunking", sub: "Sliding Window" },
                { label: "NLP Pipeline", sub: "BART/BERT" },
                { label: "Zero-Shot Classifier", sub: "Risk Category" },
                { label: "Entity Recognition", sub: "BERT-NER" },
                { label: "Risk Matrix", sub: "Liability Score" },
              ].map((step, idx, arr) => (
                <React.Fragment key={step.label}>
                  <div className={`px-2.5 py-1.5 rounded border transition-all ${
                    auditStep === idx + 1
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-200 font-bold scale-105"
                      : auditStep > idx + 1
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-white/[0.03] border-white/10 text-gray-400"
                  }`}>
                    <span className="block text-[11px] text-white">{step.label}</span>
                    <span className="block text-[9px] text-gray-400">{step.sub}</span>
                  </div>
                  {idx < arr.length - 1 && <ArrowRight className="w-3 h-3 text-gray-600 shrink-0" />}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Special Technical Callout: Why Semantic Chunking Exists */}
        {selectedProject === "legal-risk-analyzer" && (
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold">
              <Split className="w-4 h-4" />
              <span>THE 512-TOKEN CONSTRAINT &amp; SEMANTIC SLIDING-WINDOW CHUNKING</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              Transformer models (BERT and BART) have a strict 512-token context window limit. 
              Naive truncation risks cutting off indemnification, penalty liabilities, or governing law clauses midway through a sentence. 
              Shiv Kant developed a sliding-window chunking algorithm with semantic overlap that preserves cross-boundary clause context 
              while remaining strictly within transformer token ceilings.
            </p>
          </div>
        )}

        {/* Interactive Architecture Lab Nodes & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          {/* Left: Architecture Nodes */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">
              Architectural Subsystems (Click to Inspect):
            </span>

            <div className="space-y-2">
              {project.nodes.map((node) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedNode(node);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer focus-ring-cyan ${
                      isSelected
                        ? "bg-[#141926] border-cyan-500/60 shadow-lg text-white"
                        : "bg-black/30 border-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${isSelected ? "bg-cyan-400" : "bg-gray-600"}`} />
                      <div>
                        <div className="text-xs font-mono font-bold text-white tracking-wide">
                          {node.label}
                        </div>
                        <div className="text-[11px] text-gray-400">{node.tech}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">
                      {node.role}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Node Telemetry Inspector */}
          <div className="lg:col-span-6 bg-[#0c1018] border border-white/10 rounded-xl p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                    SUBSYSTEM INSPECTION
                  </span>
                  <h4 className="text-xl font-bold text-white mt-0.5">
                    {selectedNode.label}
                  </h4>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-gray-300 border border-white/10">
                  {selectedNode.tech}
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="space-y-1">
                  <span className="font-mono text-[11px] font-bold text-gray-400 tracking-wider flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    ARCHITECTURAL PURPOSE:
                  </span>
                  <p className="text-gray-200 leading-relaxed font-sans pl-5">
                    {selectedNode.whyExists}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[11px] font-bold text-gray-400 tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    FAILURE MODE / WHAT IT SOLVES:
                  </span>
                  <p className="text-gray-200 leading-relaxed font-sans pl-5">
                    {selectedNode.whatItSolves}
                  </p>
                </div>

                <div className="space-y-1 pt-1 border-t border-white/5">
                  <span className="font-mono text-[11px] font-bold text-cyan-400 tracking-wider flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    HOW SHIV KANT IMPLEMENTED IT:
                  </span>
                  <p className="text-gray-100 font-medium leading-relaxed font-sans pl-5 bg-white/[0.02] p-3 rounded-lg border border-white/5">
                    {selectedNode.shivUsage}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-500">
              <span>ZERO ASSUMPTIONS // SYSTEM OF RECORD</span>
              <span className="text-cyan-400 font-bold">100% REPRODUCIBLE</span>
            </div>
          </div>
        </div>

        {/* Verified Project Outcomes */}
        <div className="pt-4 border-t border-white/10">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-2">
            Verified Project Engineering Outcomes:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.metrics.map((m) => (
              <div
                key={m}
                className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs font-mono text-gray-300 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

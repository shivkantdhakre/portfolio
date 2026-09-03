"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { RESUME_DATA, ProjectData, ArchitectureNode } from "@/data/resumeData";
import { 
  Network, 
  SearchCheck, 
  FileText, 
  Cpu, 
  Layers, 
  Database, 
  Zap, 
  ArrowRight, 
  Sparkles,
  Info,
  CheckCircle,
  Play,
  Check
} from "lucide-react";

export function ArchitectSection() {
  const [selectedProject, setSelectedProject] = useState<string>("seo-health-scanner");
  const project = RESUME_DATA.projects.find((p) => p.id === selectedProject) || RESUME_DATA.projects[0];

  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(project.nodes[0]);
  const [isSimulatingAudit, setIsSimulatingAudit] = useState(false);
  const [auditStep, setAuditStep] = useState<number>(0);

  const handleSelectProject = (projId: string) => {
    sound.playClick();
    setSelectedProject(projId);
    const newProj = RESUME_DATA.projects.find((p) => p.id === projId) || RESUME_DATA.projects[0];
    setSelectedNode(newProj.nodes[0]);
    setIsSimulatingAudit(false);
    setAuditStep(0);
  };

  const runPipelineSimulation = () => {
    sound.playClick();
    setIsSimulatingAudit(true);
    setAuditStep(1);

    const stepsCount = project.pipeline.length;
    for (let i = 1; i <= stepsCount; i++) {
      setTimeout(() => {
        setAuditStep(i);
        if (i === stepsCount) {
          setIsSimulatingAudit(false);
          sound.playSuccess();
        }
      }, i * 900);
    }
  };

  return (
    <section id="chapter-architect" className="relative w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Chapter Marker */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-12">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl font-mono font-extrabold text-amber-500 tracking-tighter">
            03
          </span>
          <div className="h-7 w-[1px] bg-white/20" />
          <div className="space-y-0.5">
            <span className="text-xs font-mono font-bold tracking-widest text-white uppercase block">
              THE ARCHITECT &amp; LABS
            </span>
            <span className="text-[10px] font-mono text-gray-400 tracking-wider">
              INTERACTIVE SYSTEM ARCHITECTURE &amp; PIPELINES
            </span>
          </div>
        </div>

        <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/20">
          PROVEN DESIGN PATTERNS
        </span>
      </div>

      {/* Section Title */}
      <div className="max-w-4xl space-y-4 mb-10">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
          SYSTEM ARCHITECTURE LAB. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-300">
            Why Systems Exist, Not Just How They Look.
          </span>
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Recruiters and senior architects look beyond code syntax into system topology. 
          Explore the live architecture pipelines of Shiv Kant&apos;s flagship systems below: 
          inspect any subsystem node to evaluate its design justification, trade-offs, and implementation details.
        </p>
      </div>

      {/* Project Selector Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => handleSelectProject("seo-health-scanner")}
          onMouseEnter={() => sound.playHover()}
          className={`px-5 py-3 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
            selectedProject === "seo-health-scanner"
              ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
              : "bg-white/5 border border-white/10 text-gray-300 hover:border-white/30"
          }`}
        >
          <SearchCheck className="w-4 h-4" />
          <span>PROJECT 01: SEO HEALTH SCANNER (NESTJS + BULLMQ + GEMINI)</span>
        </button>

        <button
          onClick={() => handleSelectProject("legal-risk-analyzer")}
          onMouseEnter={() => sound.playHover()}
          className={`px-5 py-3 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
            selectedProject === "legal-risk-analyzer"
              ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
              : "bg-white/5 border border-white/10 text-gray-300 hover:border-white/30"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>PROJECT 02: AI LEGAL RISK ANALYZER (HUGGING FACE + CHUNKING)</span>
        </button>
      </div>

      {/* Main Architecture Interactive Lab */}
      <div className="bg-[#0b0f17] border border-white/15 rounded-2xl p-6 md:p-8 backdrop-blur-xl space-y-8">
        {/* Project Header Overview */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-1 max-w-2xl">
            <span className="text-xs font-mono text-amber-400 tracking-wider">
              {project.date} // ARCHITECTURE CASE STUDY
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
            className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Play className={`w-3.5 h-3.5 text-amber-400 ${isSimulatingAudit ? "animate-spin" : ""}`} />
            <span>{isSimulatingAudit ? "SIMULATING PIPELINE FLOW..." : "ANIMATE SYSTEM PIPELINE"}</span>
          </button>
        </div>

        {/* Visual Pipeline Sequence */}
        <div className="space-y-3">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">
            End-to-End Data Pipeline:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {project.pipeline.map((item, idx) => {
              const isCurrentStep = auditStep === idx + 1;
              const isPassed = auditStep > idx + 1;

              return (
                <div
                  key={item.step}
                  className={`p-3.5 rounded-lg border transition-all ${
                    isCurrentStep
                      ? "bg-amber-500/20 border-amber-500 text-white scale-[1.03] shadow-lg shadow-amber-500/20"
                      : isPassed
                      ? "bg-emerald-950/20 border-emerald-500/40 text-gray-300"
                      : "bg-white/[0.02] border-white/10 text-gray-400"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="font-bold text-amber-400">STAGE {item.step}</span>
                    {isPassed && <Check className="w-3 h-3 text-emerald-400" />}
                  </div>
                  <div className="text-xs font-bold text-white tracking-tight">{item.title}</div>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-3 leading-snug">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Architecture Lab Nodes & Telemetry Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          {/* Architecture Node Map */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">
              Interactive System Components (Click to Inspect):
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
                    className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? "bg-white/10 border-amber-500 text-white shadow-lg shadow-black/50"
                        : "bg-black/30 border-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isSelected ? "bg-amber-400 animate-ping" : "bg-gray-600"
                        }`}
                      />
                      <div>
                        <div className="text-xs font-mono font-bold">{node.label}</div>
                        <div className="text-[11px] text-gray-400">{node.tech}</div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 group-hover:text-amber-400">
                      INSPECT &rarr;
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Node Deep Dive Inspector (Why it exists / What it solves / Shiv usage) */}
          <div className="lg:col-span-6 bg-[#111622] border border-white/10 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-5">
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
                    ARCHITECTURAL_SPECIFICATION // NODE_TELEMETRY
                  </span>
                  <h4 className="text-xl font-bold text-white mt-1">{selectedNode.label}</h4>
                  <span className="text-xs font-mono text-gray-400">{selectedNode.tech}</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  {selectedNode.role}
                </span>
              </div>

              {/* WHY IT EXISTS */}
              <div className="space-y-1">
                <span className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  1. WHY DOES THIS COMPONENT EXIST?
                </span>
                <p className="text-xs text-gray-300 leading-relaxed pl-5 font-sans">
                  {selectedNode.whyExists}
                </p>
              </div>

              {/* WHAT IT SOLVES */}
              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  2. WHAT BOTTLENECK / DEFECT DOES IT SOLVE?
                </span>
                <p className="text-xs text-gray-300 leading-relaxed pl-5 font-sans">
                  {selectedNode.whatItSolves}
                </p>
              </div>

              {/* SHIV KANT'S USAGE */}
              <div className="space-y-1 p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  3. HOW SHIV KANT ENGINEERED IT:
                </span>
                <p className="text-xs text-gray-200 leading-relaxed pl-5 font-sans">
                  {selectedNode.shivUsage}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-500">
              <span>STATUS: PRODUCTION_TESTED</span>
              <span>VERIFIED METRIC LOGS</span>
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

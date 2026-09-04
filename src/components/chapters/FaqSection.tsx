"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { ChapterTransition, ChapterHeading } from "@/components/motion/ChapterTransition";
import { FadeIn } from "@/components/motion/FadeIn";
import { 
  ChevronDown, 
  Sparkles, 
  Terminal, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  BrainCircuit, 
  GraduationCap, 
  Mail
} from "lucide-react";

interface FaqItem {
  id: string;
  category: string;
  icon: React.ElementType;
  question: string;
  answer: React.ReactNode;
  tags: string[];
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-who",
    category: "IDENTITY & BACKGROUND",
    icon: Sparkles,
    question: "Who is Shiv Kant Dhakre?",
    answer: (
      <p className="text-gray-300 text-sm leading-relaxed">
        <strong>Shiv Kant Dhakre</strong> is a Full-Stack Engineer and AI Systems Builder based in Uttar Pradesh, India, 
        pursuing a Bachelor of Technology in Computer Science and Engineering at Madan Mohan Malaviya University of Technology (MMMUT), 
        Gorakhpur (CGPA: 7.62 / 10.0). He has hands-on industry experience building production multi-tenant ERP platforms, 
        distributed backend architectures, live concurrency engines, and machine learning pipelines.
      </p>
    ),
    tags: ["Full Stack Engineer", "MMMUT", "Computer Science", "Shiv Kant Dhakre"],
  },
  {
    id: "faq-specialization",
    category: "ENGINEERING FOCUS",
    icon: Cpu,
    question: "What technical problems does Shiv Kant Dhakre specialize in solving?",
    answer: (
      <div className="space-y-2 text-gray-300 text-sm leading-relaxed">
        <p>
          Shiv Kant specializes in <strong>production resilience and systems architecture</strong>, including:
        </p>
        <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-gray-300">
          <li><strong>Live Concurrency &amp; Race Conditions:</strong> Engineering unified token-refresh engines with mutex request locking to prevent user logouts during concurrent API bursts.</li>
          <li><strong>Multi-Tenant Architecture:</strong> Designing isolated data models, branch separation, and ledger double-entry bookkeeping across Web and Mobile.</li>
          <li><strong>Offline Data Integrity:</strong> Crafting OTA-safe pure-JS UUID generators and retry reconciliation logic for warehouse workers in low-connectivity environments.</li>
          <li><strong>Asynchronous Task Processing:</strong> Preventing Node.js event-loop starvation by delegating heavy compute (audits, ML chunking) to BullMQ worker pools backed by Redis.</li>
        </ul>
      </div>
    ),
    tags: ["Concurrency", "Mutex Request Locking", "Multi-Tenancy", "Offline Sync", "BullMQ"],
  },
  {
    id: "faq-tech-stack",
    category: "TECHNICAL TAXONOMY",
    icon: Code2,
    question: "What technologies and frameworks does Shiv Kant Dhakre use?",
    answer: (
      <div className="space-y-2 text-gray-300 text-sm leading-relaxed">
        <p>His core production technologies include:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
          <div className="p-2.5 rounded bg-white/5 border border-white/5">
            <span className="text-amber-400 font-bold block mb-0.5">LANGUAGES:</span>
            <span className="text-gray-300">TypeScript, JavaScript (ES6+), Python, C++, HTML5, CSS3</span>
          </div>
          <div className="p-2.5 rounded bg-white/5 border border-white/5">
            <span className="text-cyan-400 font-bold block mb-0.5">FULL-STACK &amp; MOBILE:</span>
            <span className="text-gray-300">Next.js (App Router), React.js, React Native (Expo), NestJS, Node.js, FastAPI</span>
          </div>
          <div className="p-2.5 rounded bg-white/5 border border-white/5">
            <span className="text-emerald-400 font-bold block mb-0.5">STORAGE &amp; QUEUES:</span>
            <span className="text-gray-300">PostgreSQL, Redis (In-Memory Cache &amp; Mutex), BullMQ, Prisma ORM, MongoDB</span>
          </div>
          <div className="p-2.5 rounded bg-white/5 border border-white/5">
            <span className="text-purple-400 font-bold block mb-0.5">AI &amp; MACHINE LEARNING:</span>
            <span className="text-gray-300">Hugging Face (BART/BERT), Zero-Shot Classification, RAG, Gemini AI, PyPDF</span>
          </div>
        </div>
      </div>
    ),
    tags: ["Next.js", "NestJS", "TypeScript", "Redis", "BullMQ", "PostgreSQL", "React Native"],
  },
  {
    id: "faq-projects",
    category: "PRODUCTION PROJECTS",
    icon: BrainCircuit,
    question: "What major software projects has Shiv Kant Dhakre developed?",
    answer: (
      <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
        <div>
          <h4 className="text-white font-bold font-mono text-xs flex items-center gap-1.5 text-amber-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            1. SEO Health Scanner (Enterprise Web Audit Engine)
          </h4>
          <p className="text-xs text-gray-300 mt-1 pl-5">
            Full-stack asynchronous performance analyzer built with NestJS, Next.js, and Prisma ORM. Evaluates Core Web Vitals via Google Lighthouse API, queues heavy tasks via BullMQ and Redis, and translates raw metrics into actionable developer remediation plans using Google Gemini AI.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold font-mono text-xs flex items-center gap-1.5 text-cyan-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            2. AI-Powered Legal Risk Analyzer (NLP &amp; Zero-Shot Classification)
          </h4>
          <p className="text-xs text-gray-300 mt-1 pl-5">
            NLP contract analyzer developed with Python and Hugging Face. Features a custom sliding-window chunking algorithm bypassing rigid 512-token transformer constraints to perform zero-shot risk classification, named entity recognition (NER), and contractual liability scoring across 50+ page legal agreements.
          </p>
        </div>
      </div>
    ),
    tags: ["SEO Health Scanner", "Legal Risk Analyzer", "Lighthouse API", "Gemini AI", "Hugging Face"],
  },
  {
    id: "faq-experience",
    category: "INDUSTRY EXPERIENCE",
    icon: Terminal,
    question: "What is Shiv Kant Dhakre's professional work experience?",
    answer: (
      <div className="space-y-2 text-gray-300 text-sm leading-relaxed">
        <p>
          Shiv Kant served as a <strong>Full Stack Developer Intern at Groww You</strong> (06/2026 – 08/2026), where he:
        </p>
        <ul className="space-y-1 list-disc list-inside text-xs sm:text-sm text-gray-300">
          <li>Architected a multi-tenant ERP platform from scratch covering inventory, multi-branch operations, GST/E-Way billing, and dual-format (A4 and POS thermal) receipt printing.</li>
          <li>Root-caused and resolved an in-flight token-refresh race condition in a live ride-hailing app with mutex request locking.</li>
          <li>Established the engineering team&apos;s first CI/CD pipelines via Husky pre-commit gates and GitHub Actions.</li>
          <li>Shipped an admin broadcast notification system and an end-to-end home-services marketplace with wallet ledger disbursement.</li>
        </ul>
      </div>
    ),
    tags: ["Groww You", "Full Stack Developer", "Production Concurrency", "Multi-Tenant ERP"],
  },
  {
    id: "faq-education",
    category: "ACADEMICS & HONORS",
    icon: GraduationCap,
    question: "What is Shiv Kant Dhakre's academic and leadership background?",
    answer: (
      <div className="space-y-2 text-gray-300 text-sm leading-relaxed">
        <p>
          Shiv Kant is in his final years of B.Tech in Computer Science and Engineering at MMMUT Gorakhpur with a <strong>CGPA of 7.62 / 10.0</strong>. 
          His verified milestones include:
        </p>
        <ul className="space-y-1 list-disc list-inside text-xs sm:text-sm text-gray-300">
          <li><strong>Secretary</strong>, National Service Scheme (NSS) Cell, MMMUT (07/2025 – Present): Directed university flagship programs (PARARTH&apos;26, GOONJ&apos;26) and student digital literacy initiatives.</li>
          <li><strong>Technical Co-ordinator</strong>, IIMS-2025 International Conference: Maintained conference submission portal with 100% uptime; awarded Certificate of Appreciation by Dept. of Civil Engineering.</li>
          <li><strong>3rd Place</strong>: Flip Flop Duo Coding Challenge (ENNEXUS&apos;24).</li>
          <li><strong>AIR 61,134</strong>: Joint Entrance Examination (JEE) Mains 2023.</li>
        </ul>
      </div>
    ),
    tags: ["MMMUT", "NSS Secretary", "JEE Mains", "IIMS-2025", "Flip Flop Coding"],
  },
  {
    id: "faq-contact",
    category: "RECRUITER ACCESS",
    icon: Mail,
    question: "How can recruiters and engineering teams get in touch with Shiv Kant Dhakre?",
    answer: (
      <div className="space-y-2 text-gray-300 text-sm leading-relaxed">
        <p>
          Shiv Kant is actively open to high-impact software engineering, backend architecture, and full-stack/AI roles. You can contact him via:
        </p>
        <div className="flex flex-wrap gap-2 text-xs font-mono pt-1">
          <a
            href="mailto:dhakreshivkant@gmail.com"
            className="px-3 py-1.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-colors"
          >
            Email: dhakreshivkant@gmail.com
          </a>
          <a
            href="tel:+916396107509"
            className="px-3 py-1.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 transition-colors"
          >
            Phone: +91 63961-07509
          </a>
          <a
            href="https://www.linkedin.com/in/shivkantdhakre"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30 hover:bg-blue-500/25 transition-colors"
          >
            LinkedIn: in/shivkantdhakre
          </a>
          <a
            href="https://github.com/shivkantdhakre"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded bg-white/10 text-gray-200 border border-white/20 hover:bg-white/15 transition-colors"
          >
            GitHub: shivkantdhakre
          </a>
        </div>
      </div>
    ),
    tags: ["Contact", "Hire", "Recruiter Access", "Email", "LinkedIn"],
  },
];

export function FaqSection() {
  const [openItem, setOpenItem] = useState<string>("faq-who");

  const toggleItem = (id: string) => {
    sound.playClick();
    setOpenItem((prev) => (prev === id ? "" : id));
  };

  return (
    <section
      id="chapter-faq"
      aria-labelledby="faq-heading"
      className="relative w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10"
    >
      {/* Chapter Marker */}
      <ChapterTransition
        number="06"
        title="KNOWLEDGE BASE & AEO"
        subtitle="ANSWER ENGINE & SEARCH GROUNDING // VERIFIED FACTS"
        badge="STRUCTURED ANSWERS"
        badgeTone="blue"
      />

      {/* Section Introduction */}
      <div className="max-w-4xl space-y-3 mb-10">
        <ChapterHeading chapter="06" telemetry="GROUNDED_FACTS // SEARCH_AEO">
          Frequently Asked <br className="hidden sm:inline" />
          <span className="text-blue-400">
            Engineering &amp; Background Questions
          </span>
        </ChapterHeading>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
          Direct, verified answers to common technical queries asked by engineering hiring managers, 
          technical recruiters, and AI answer engines (Perplexity, Google AI Overviews, ChatGPT Search, Claude).
        </p>
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-3">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openItem === item.id;
          const Icon = item.icon;

          return (
            <article
              key={item.id}
              className={`manga-panel rounded-xl border transition-all overflow-hidden ${
                isOpen
                  ? "bg-[#0d121c] border-amber-500/40 shadow-lg shadow-amber-500/5"
                  : "bg-[#0a0d14]/70 border-white/10 hover:border-white/20"
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                id={`faq-question-${item.id}`}
                onClick={() => toggleItem(item.id)}
                onMouseEnter={() => sound.playHover()}
                className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer group focus-ring-amber"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-amber-400 font-bold">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2 group-hover:text-amber-300 transition-colors">
                    <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{item.question}</span>
                  </h3>
                </div>

                <div
                  className={`p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 group-hover:text-white transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-amber-400" : ""
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <div
                id={`faq-answer-${item.id}`}
                role="region"
                aria-labelledby={`faq-question-${item.id}`}
                className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-white/5 space-y-3">
                    {item.answer}

                    {/* Taxonomy Tags */}
                    <div className="pt-2 flex flex-wrap gap-1.5 border-t border-white/5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-gray-400 border border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}


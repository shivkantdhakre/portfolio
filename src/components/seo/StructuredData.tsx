import React from "react";
import { RESUME_DATA } from "@/data/resumeData";

export function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shivkantdhakre.vercel.app";
  const data = RESUME_DATA;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Person Entity
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Shiv Kant Dhakre",
        alternateName: ["Shiv Kant", "shivkantdhakre"],
        givenName: "Shiv Kant",
        familyName: "Dhakre",
        jobTitle: "Full-Stack Engineer & AI/Systems Builder",
        description: data.summary,
        url: siteUrl,
        image: `${siteUrl}/opengraph-image`,
        email: data.contact.email,
        telephone: data.contact.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Agra",
          addressRegion: "Uttar Pradesh",
          addressCountry: "India",
        },
        sameAs: [
          data.contact.githubUrl,
          data.contact.linkedinUrl,
        ],
        alumniOf: {
          "@type": "EducationalOrganization",
          name: data.education.institution,
          url: "https://www.mmmut.ac.in",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Gorakhpur",
            addressRegion: "Uttar Pradesh",
            addressCountry: "India",
          },
        },
        memberOf: {
          "@type": "Organization",
          name: "National Service Scheme (NSS) Cell, MMMUT",
          roleName: "Secretary",
        },
        knowsAbout: [
          "Full Stack Development",
          "Software Engineering",
          "Next.js",
          "React.js",
          "React Native",
          "NestJS",
          "Node.js",
          "Python",
          "FastAPI",
          "C++",
          "TypeScript",
          "PostgreSQL",
          "Redis",
          "BullMQ",
          "Hugging Face Transformers",
          "Large Language Models (LLMs)",
          "Retrieval-Augmented Generation (RAG)",
          "Systems Concurrency & Mutex Request Locking",
          "Multi-Tenant Architecture",
          "Offline Data Synchronization",
          "CI/CD Pipelines & GitHub Actions",
        ],
      },

      // 2. WebSite Entity
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Shiv Kant Dhakre — Full Stack Engineer & AI Systems Builder Portfolio",
        description: data.contact.tagline,
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
        inLanguage: "en-US",
      },

      // 3. ProfilePage Entity
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: "Shiv Kant Dhakre — Full Stack Engineer | AI • Backend • Mobile",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#person`,
        },
        mainEntity: {
          "@id": `${siteUrl}/#person`,
        },
        inLanguage: "en-US",
      },

      // 4. Software Application: SEO Health Scanner
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#project-seo-health-scanner`,
        name: "SEO Health Scanner",
        operatingSystem: "Web",
        applicationCategory: "DeveloperApplication",
        description: data.projects[0].overview,
        author: {
          "@id": `${siteUrl}/#person`,
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: data.projects[0].pipeline.map((p) => `${p.title}: ${p.detail}`).join("; "),
      },

      // 5. Software Application: AI-Powered Legal Risk Analyzer
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#project-legal-risk-analyzer`,
        name: "AI-Powered Legal Risk Analyzer",
        operatingSystem: "Web / CLI",
        applicationCategory: "BusinessApplication",
        description: data.projects[1].overview,
        author: {
          "@id": `${siteUrl}/#person`,
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: data.projects[1].pipeline.map((p) => `${p.title}: ${p.detail}`).join("; "),
      },

      // 6. FAQPage Entity for Answer Engine Optimization (AEO)
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Who is Shiv Kant Dhakre?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Shiv Kant Dhakre is a Full-Stack and AI Systems Engineer pursuing a B.Tech in Computer Science and Engineering at Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur. He has industry experience building multi-tenant ERPs, production concurrency engines, and machine learning pipelines.",
            },
          },
          {
            "@type": "Question",
            name: "What does Shiv Kant Dhakre specialize in?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Shiv Kant Dhakre specializes in production full-stack engineering, distributed backend architecture (NestJS, Node.js, Redis, BullMQ, PostgreSQL), mobile app development (React Native, Expo), and machine learning pipelines (Hugging Face NLP, RAG, Gemini AI).",
            },
          },
          {
            "@type": "Question",
            name: "What technologies does Shiv Kant Dhakre use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "His core tech stack includes TypeScript, JavaScript, Python, C++, React.js, Next.js (App Router), React Native (Expo), NestJS, Node.js, FastAPI, PostgreSQL, Redis, BullMQ, Prisma ORM, Hugging Face (BART/BERT), and Gemini AI.",
            },
          },
          {
            "@type": "Question",
            name: "What notable production problems has Shiv Kant Dhakre solved?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "At Groww You, he root-caused and engineered an in-flight token-refresh race condition in a live ride-hailing app using mutex request locking and queued retries, built an entire multi-tenant ERP with dual-format receipt printing, and created an OTA-safe pure-JS offline synchronization engine.",
            },
          },
          {
            "@type": "Question",
            name: "What major software projects has Shiv Kant Dhakre built?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "His featured architectures include the 'SEO Health Scanner' (an asynchronous web audit engine combining NestJS, BullMQ, Redis, Google Lighthouse, and Gemini AI) and the 'AI-Powered Legal Risk Analyzer' (an NLP system with custom semantic chunking bypassing transformer token limits for zero-shot contract liability scoring).",
            },
          },
          {
            "@type": "Question",
            name: "How can recruiters and engineering teams contact Shiv Kant Dhakre?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Shiv Kant Dhakre can be reached directly via email at dhakreshivkant@gmail.com, by telephone at +91 63961-07509, on GitHub at https://github.com/shivkantdhakre, and on LinkedIn at https://www.linkedin.com/in/shivkantdhakre.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

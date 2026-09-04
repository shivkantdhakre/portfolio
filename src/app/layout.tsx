import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/seo/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shivkantdhakre.vercel.app";

export const viewport: Viewport = {
  themeColor: "#07080c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shiv Kant Dhakre — Full Stack Engineer | AI • Backend • Mobile",
    template: "%s | Shiv Kant Dhakre",
  },
  description:
    "Full Stack & AI Systems Engineer specializing in production concurrency, multi-tenant ERPs, distributed backends (NestJS, Redis, BullMQ), and mobile architecture (React Native). Explore interactive architecture labs and verified engineering case studies.",
  applicationName: "Shiv Kant Dhakre Portfolio",
  authors: [{ name: "Shiv Kant Dhakre", url: "https://github.com/shivkantdhakre" }],
  creator: "Shiv Kant Dhakre",
  publisher: "Shiv Kant Dhakre",
  category: "technology",
  keywords: [
    "Shiv Kant Dhakre",
    "Full Stack Engineer",
    "Software Engineer",
    "AI Systems Engineer",
    "Backend Architecture",
    "NestJS Developer",
    "Next.js App Router",
    "React Native Expo",
    "Redis BullMQ Concurrency",
    "PostgreSQL Prisma",
    "Hugging Face RAG",
    "MMMUT Computer Science",
    "Token Refresh Mutex Engine",
    "Multi-Tenant ERP",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Shiv Kant Dhakre — Full Stack Engineer | AI • Backend • Mobile",
    description:
      "Interactive 3D engineering portfolio of Shiv Kant Dhakre. Production case studies, concurrency simulation, and architecture labs.",
    url: siteUrl,
    siteName: "Shiv Kant Dhakre Engineering Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        secureUrl: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Shiv Kant Dhakre — Full Stack & AI Systems Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiv Kant Dhakre — Full Stack Engineer",
    description:
      "Full-stack engineer building production systems, AI workflows & digital experiences.",
    creator: "@shivkantdhakre",
    images: [`${siteUrl}/og-image.png`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/apple-touch-icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#07080c] text-[#f3f4f6]">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}

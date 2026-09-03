import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shiv Kant Dhakre — Full Stack Engineer | AI • Backend • Mobile",
  description:
    "Full Stack Engineer specializing in production systems, AI workflows, backend architecture, mobile applications and modern web experiences. Hands-on experience architecting multi-tenant ERPs, concurrency engines, and AI pipelines.",
  keywords: [
    "Shiv Kant Dhakre",
    "Full Stack Engineer",
    "Software Engineer",
    "AI Engineer",
    "Backend Architecture",
    "Next.js",
    "React Native",
    "NestJS",
    "BullMQ",
    "Redis",
    "PostgreSQL",
    "Hugging Face",
    "MMMUT",
  ],
  authors: [{ name: "Shiv Kant Dhakre", url: "https://github.com/shivkantdhakre" }],
  openGraph: {
    title: "Shiv Kant Dhakre — Full Stack Engineer | AI • Backend • Mobile",
    description:
      "Explore the interactive 3D engineering portfolio of Shiv Kant Dhakre. Production case studies, concurrency simulation, and architecture labs.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiv Kant Dhakre — Full Stack Engineer",
    description:
      "Full-stack engineer building production systems, AI workflows & digital experiences.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#07080c] text-[#f3f4f6]">
        {children}
      </body>
    </html>
  );
}

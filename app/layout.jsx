import "./globals.css";
import { Inter, Outfit } from "next/font/google";
import Analytics from "../components/Analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Robin Singh Rawat — AI Generalist | React Next.js Angular TypeScript",
  description: "Full-stack developer with 5 years experience specializing in AI integration and LLM-powered web applications. React, Next.js, Angular, TypeScript.",
  metadataBase: new URL("https://robin-singh-rawat.netlify.app/"),
  alternates: {
    canonical: "https://robin-singh-rawat.netlify.app/",
  },
  openGraph: {
    type: "website",
    url: "https://robin-singh-rawat.netlify.app/",
    title: "Robin Singh Rawat — AI Generalist",
    description:
      "From landing pages to production apps. AI assistants, RAG chatbots, voice agents, and workflow automation—end to end.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robin Singh Rawat — AI Generalist",
    description:
      "From landing pages to production apps. AI assistants, RAG chatbots, voice agents, and workflow automation—end to end.",
  },
};

export const viewport = {
  themeColor: "#020617",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${outfit.variable}`}>
      <head />
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

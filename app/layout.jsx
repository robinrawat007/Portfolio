import "./globals.css";
import { Inter, Outfit, Space_Grotesk, JetBrains_Mono } from "next/font/google";
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

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const BASE_URL = "https://robin-singh-rawat.netlify.app";

export const metadata = {
  title: "Robin Singh Rawat — AI Generalist | React Next.js Angular TypeScript",
  description:
    "Full-stack developer with 5 years experience specializing in AI integration and LLM-powered web applications. React, Next.js, Angular, TypeScript.",
  keywords: [
    "Robin Singh Rawat",
    "AI Generalist",
    "Full Stack Engineer",
    "React developer",
    "Next.js developer",
    "Angular developer",
    "TypeScript",
    "RAG chatbot",
    "LLM integration",
    "Claude API",
    "AI automation",
    "n8n",
    "portfolio",
    "Sonipat",
    "India",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Robin Singh Rawat — AI Generalist & Full Stack Engineer",
    description:
      "From landing pages to production apps. AI assistants, RAG chatbots, voice agents, and workflow automation — end to end.",
    siteName: "Robin Singh Rawat",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Robin Singh Rawat — AI Generalist & Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@robinrawat37",
    creator: "@robinrawat37",
    title: "Robin Singh Rawat — AI Generalist & Full Stack Engineer",
    description:
      "From landing pages to production apps. AI assistants, RAG chatbots, voice agents, and workflow automation — end to end.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
  icons: {
    icon: "/Logo.png",
    apple: "/Logo.png",
  },
};

export const viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Robin Singh Rawat",
      url: BASE_URL,
      jobTitle: "AI Generalist & Full Stack Engineer",
      description:
        "Full-stack developer with 5 years experience specializing in AI integration, RAG systems, and LLM-powered web applications.",
      email: "robinrawat37@gmail.com",
      sameAs: [
        "https://www.linkedin.com/in/robinrawat1/",
        "https://github.com/robinrawat007",
        "https://x.com/robinrawat37",
        "https://www.instagram.com/robinrawat01/",
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "Angular",
        "TypeScript",
        "Claude API",
        "OpenAI API",
        "RAG Systems",
        "n8n Automation",
        "LangChain",
        "Prompt Engineering",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sonipat",
        addressRegion: "Haryana",
        addressCountry: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      name: "Robin Singh Rawat",
      url: BASE_URL,
      description:
        "Portfolio of Robin Singh Rawat — AI Generalist & Full Stack Engineer building AI-powered web applications.",
      author: { "@id": `${BASE_URL}/#person` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${outfit.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to Google Fonts CDN (already used by next/font, belt-and-suspenders) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

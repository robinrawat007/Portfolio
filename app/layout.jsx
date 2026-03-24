import "./globals.css";

export const metadata = {
  title: "Robin Singh Rawat — AI Integration Developer | React Next.js Angular TypeScript",
  description: "Frontend developer with 5 years experience specializing in AI integration and LLM-powered web applications. React, Next.js, Angular, TypeScript. Open to remote roles globally.",
  metadataBase: new URL("https://robin-singh-rawat.netlify.app/"),
  openGraph: {
    type: "website",
    url: "https://robin-singh-rawat.netlify.app/",
    title: "Robin Singh Rawat — AI Integration Developer",
    description: "Building AI-powered web apps and interfaces that make LLMs actually usable for real people.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robin Singh Rawat — AI Integration Developer",
    description: "Building AI-powered web apps and interfaces that make LLMs actually usable for real people.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.png",
  },
};

export const viewport = {
  themeColor: "#020617",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="canonical" href="https://robin-singh-rawat.netlify.app/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}

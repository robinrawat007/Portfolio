export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://robin-singh-rawat.netlify.app/sitemap.xml",
  };
}


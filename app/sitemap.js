const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://robin-singh-rawat.netlify.app";

export default function sitemap() {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

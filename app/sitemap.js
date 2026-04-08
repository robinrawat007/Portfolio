export default function sitemap() {
  const baseUrl = "https://robin-singh-rawat.netlify.app";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}


export default function sitemap() {
  const baseUrl = "https://robin-singh-rawat.netlify.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Add other routes if they exist, but for this portfolio it seems mostly a single page.
  ];
}

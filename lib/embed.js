export async function embed(text) {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: "text-embedding-3-small", input: text }),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => res.status);
    throw new Error(`OpenAI Embeddings error ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.data[0].embedding;
}

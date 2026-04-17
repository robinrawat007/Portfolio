// In-memory rate limiter — resets on server restart, suitable for single-instance deployments.
// For multi-instance / serverless, swap this store for Redis or Upstash.
const store = new Map();

// Prune entries older than 10 minutes every 5 minutes to prevent unbounded growth.
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}, 5 * 60 * 1000);

/**
 * Returns true if the request is allowed, false if rate-limited.
 * @param {string} ip       - Client IP (from request headers)
 * @param {number} limit    - Max requests allowed per window
 * @param {number} windowMs - Window size in milliseconds
 */
export function checkRateLimit(ip, limit, windowMs) {
  const now = Date.now();
  const key = ip || "unknown";
  let entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    entry = { count: 1, resetAt: now + windowMs };
    store.set(key, entry);
    return true;
  }

  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}

/**
 * Extract the real client IP from Next.js request headers.
 * Falls back through x-forwarded-for → x-real-ip → "unknown".
 * @param {Request} req
 */
export function getClientIp(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

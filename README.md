# Robin Portfolio (Next.js)

Personal portfolio site built with **Next.js (App Router)**, **Tailwind CSS**, and interactive UI components.

## Run locally

```bash
pnpm install
pnpm dev
```

## Production build

```bash
pnpm build
pnpm start
```

## Environment variables

Copy `.env.example` to `.env` and fill values as needed:

- `NEXT_PUBLIC_STATIC_EXPORT`: set to `"true"` only if you deploy as a static export (no API routes).
- `ANTHROPIC_API_KEY`: enables the Atlas chat API route (`/api/chat`).
- SMTP + Google Sheets vars: enable enquiry forms server-side.
- `NEXT_PUBLIC_RESUME_URL`: optional resume link shown in the navbar.

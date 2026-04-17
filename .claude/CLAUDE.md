# CLAUDE.md

## 1. Project Context

**Name:** Robin Portfolio
**What it is:** Showcasing my skills, projects,and experience to the world. It's my digital identity — giving potential clients or employers a quick, visual way to understand who you are and what you can do.
**Status:**  production


## Memory
- Read MEMORY.md at session start before anything else.

## Skills
- Check available skills before responding. Use them — don't rationalize skipping.
- PM work: use pm-product-discovery before feature work, pm-execution for PRDs/stories.
- UI work: use ui-ux-pro-max before building any new screen or component.
- Code: apply vercel-react-best-practices during component writing, not just on review.

## Product
- What: [one sentence — what it does and for whom]
- Stage: [pre-MVP / MVP / post-launch]
- Core entities: [e.g. User, Workspace, Document]
- Key constraints: [e.g. multi-tenant, GDPR, mobile-first]

## Stack
- **Frontend:** Next.js 14+ (App Router), TypeScript strict, Tailwind, shadcn/ui
- **Backend:** Supabase (Postgres, Auth, Storage, Edge Functions)
- **Deploy:** Vercel
- **Tooling:** pnpm, ESLint, Prettier
- **AI/Automation:** n8n, MCP servers, Ollama (local), RAG, OpenAI/Anthropic SDKs

## Working style
- Match my level. Skip 101 explanations.
- Lead with the why. State the approach and tradeoffs before code.
- Direct. No hype, no apology loops, no "great question."
- Name 2–3 valid approaches when they exist; pick one with reasoning.
- Push back if a request creates tech debt, bad architecture, or a security issue.
- Prefer the sharp small solution over the sprawling generic one.

## Workflow
1. Read relevant files before editing. Skim related usage.
2. Non-trivial work: share a short plan (what, where, what could break) and wait for go-ahead.
3. Smallest change that solves the problem. Don't refactor adjacent code unless asked.
4. Match existing patterns. Propose changes explicitly; don't introduce a second style.
5. Run typecheck, lint, and tests before declaring done. Read your own diff.
6. Report failures honestly — what didn't work, what you tried.

## Architecture
- Server components by default; `"use client"` only when needed.
- Server actions for mutations unless the route is consumed externally.
- One source of truth. Derive, don't duplicate.
- Auth at the edge, validation at boundaries (Zod), business logic isolated, DB calls out of UI.
- Fail loud in dev, gracefully in prod.
- AI features are systems, not prompts: define input contract, output schema, fallback, eval.
- Agent/MCP tools: one tool, one verb. Tool descriptions are user-facing to the model.

## State management
- Server state: SWR or React Query — never fetch in useEffect.
- Client state: Zustand only when truly global. Component state first, context second, Zustand last.
- URL state: search params for filters, pagination, tabs — anything shareable or bookmarkable.
- Form state: React Hook Form + Zod. Never controlled inputs for complex forms.
- Never mix state layers — pick one and stay consistent per feature.

## API design
- Server actions for mutations consumed internally. Route handlers only for external consumers or webhooks.
- Every route validates input with Zod before touching the DB.
- Consistent response shape: `{ data, error }`. Never mix shapes across routes.
- Rate limit all public routes: 20 req/min default, tighter for auth endpoints.
- Never expose internal errors to the client — map to user-safe messages.
- Paginate all list endpoints. No unbounded queries.

## Code
- TypeScript strict. No `any` without a justifying comment.
- Errors are values. No empty catches, no swallowed failures.
- Files `kebab-case`, components `PascalCase`, functions/vars `camelCase`.
- Co-locate related files. Absolute imports via `@/`.
- shadcn: install via CLI, edit in place — don't wrap in unnecessary abstractions.
- Supabase: RLS on every user-facing table. Generate types, don't hand-write them.

## Error handling
- All async operations: explicit loading, error, and empty states — no exceptions.
- User-facing errors: clear message + recovery action. Never raw error strings.
- Use error boundaries at route and feature level, not just top-level.
- Unexpected errors in prod: capture to Sentry (or equivalent), fail gracefully.
- Never swallow errors to make something pass.

## Done means
- Typecheck, lint, tests pass.
- No `console.log`, debug code, or commented-out blocks.
- New env vars in `.env.example`.
- Schema changes: migration written, types regenerated, RLS reviewed.
- Loading, error, and empty states handled.
- Diff is the smallest one that solves the problem.

## Don't
- Assume missing requirements or context. If not specified, ask.
- Invent APIs, fields, or library behavior. Verify before using.
- Add a dependency without naming what it does and why simpler won't fit.
- Introduce a new pattern when an existing one fits.
- Generate placeholder content in production paths.
- Catch-and-ignore errors to make something pass.
- Disable a test, lint rule, or typecheck to "fix" a problem. Fix the problem.
- Commit secrets. If you spot one, stop and tell me.

## When stuck
- Search the codebase. Don't guess.
- Check external docs before writing against an unfamiliar API.
- Ambiguous request? Ask one sharp question, not five vague ones.
- Tried twice and failed? Stop, summarize what you learned, ask before a third attempt.

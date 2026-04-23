-- ─────────────────────────────────────────────────────────────────────────────
-- ADD A NEW PROJECT
-- DO NOT run migrations/001_schema.sql again — this is the only file to run.
--
-- 1. Fill in every value marked with <...>
-- 2. Open Supabase Dashboard → SQL Editor → New Query
-- 3. Paste this file and click Run
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO projects (
  id,
  title,
  subtitle,
  period,
  tech,
  image_url,
  visit_url,
  case_study,
  display_order,
  published
)
VALUES (
  -- Unique slug, lowercase-kebab-case, no spaces  e.g. 'my-project'
  '<project-id>',

  -- Display name shown on the card
  '<Project Title>',

  -- Short tagline shown in green below the title
  '<One-line tagline>',

  -- Date range  e.g. 'Jan 2025' or 'Jan – Mar 2025'
  '<Month YYYY>',

  -- Tech tags rendered as pills  e.g. ARRAY['Next.js', 'TypeScript', 'Supabase']
  ARRAY['<Tech 1>', '<Tech 2>', '<Tech 3>'],

  -- Path to image in /public  e.g. '/my-project.png'
  -- Set to NULL if you have no image yet
  '<image-path-or-NULL>',

  -- Live URL  e.g. 'https://myproject.vercel.app'
  -- Set to NULL to hide the visit button
  '<https://... or NULL>',

  -- Case study shown on the card flip-side
  -- Uses jsonb_build_object to avoid Windows carriage-return issues with JSON string literals
  jsonb_build_object('sections', jsonb_build_array(
    jsonb_build_object('title', 'Challenge', 'content', '<Describe the problem or pain point you were solving.>'),
    jsonb_build_object('title', 'Solution',  'content', '<Describe what you built and how it solved the problem.>'),
    jsonb_build_object('title', 'Outcome',   'content', '<Describe measurable results, impact, or improvements.>')
  )),

  -- Controls card order in the carousel (lower = appears first)
  <1>,

  -- Set to false to hide without deleting
  true
);

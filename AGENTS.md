# AGENTS.md

This document provides an overview of the project architecture for developers and AI agents working on this codebase.

## Project Overview

**Service Carte Grise** — a professional French vehicle registration (carte grise) service website, 100% online. Users can select a service, fill in personal details, learn which documents to provide, and follow payment instructions. Form submissions trigger an email notification to the service's inbox.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start (SSR) |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + custom CSS variables in `styles.css` |
| Email | nodemailer (server-side, optional SMTP config) |
| Language | TypeScript 5 |
| Deployment | Netlify (SSR via Netlify Functions) |

## Directory Structure

```
src/
├── routes/
│   ├── __root.tsx       # Root layout: head meta, Google Fonts, html/body
│   ├── index.tsx        # Full landing page (all sections, components)
│   └── api/
│       └── contact.ts   # POST /api/contact — form submission → email
├── router.tsx           # TanStack Router instance
└── styles.css           # Global CSS variables, component classes
```

## Key Architecture Decisions

### Single-File Page (`src/routes/index.tsx`)
All page sections (Header, Hero, TrustBar, Testimonials, Services, Process, Footer) are co-located in `index.tsx` as inline components. This avoids premature abstraction for a single-page site.

### CSS Strategy
Tailwind CSS is present but the design uses mostly inline styles + named CSS classes in `styles.css`. CSS custom properties (`--navy`, `--gold`, etc.) define the color palette. This was chosen for precise control over the French official/authoritative aesthetic.

### Multi-step Form
The `Process` component manages a 3-step flow with React state (`step: 1 | 2 | 3`). Step 1 submits personal info to `/api/contact`, steps 2–3 are informational (documents list, payment details). Service pre-selection from the Services section uses a `CustomEvent('selectService')`.

### Email Sending
`/api/contact` uses dynamic `import('nodemailer')` so it only loads on the server. If `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` env vars are not set, submissions are logged to console but still return success to the user.

## Environment Variables

| Variable  | Required | Description |
|-----------|----------|-------------|
| SMTP_HOST | Optional | SMTP server hostname (e.g. smtp.gmail.com) |
| SMTP_PORT | Optional | SMTP port, defaults to 587 |
| SMTP_USER | Optional | SMTP sender email address |
| SMTP_PASS | Optional | SMTP password or Gmail App Password |

## Conventions

- Components: PascalCase, defined as plain functions in `index.tsx`
- Data: const arrays/objects at top of `index.tsx`
- No external UI library — all UI is hand-crafted with inline styles and CSS classes
- French language throughout all UI text
- Contact email hardcoded: `garageautomobilefrance30@gmail.com`

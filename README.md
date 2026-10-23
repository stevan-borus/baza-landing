# Baza Landing

Landing page for Baza Pilates studio built with Next.js.

🌐 **Live Site:** [bazapilates.com](https://bazapilates.com)

## Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Base UI
- **Package Manager:** Bun
- **Email:** Resend

## Getting Started

Use Node.js 26.12.1, pinned in `.node-version`. With fnm:

```bash
fnm install
fnm use
```

The supported runtime ranges start at Node.js 24.22.1 and 26.12.1, which include
the [October 2026 security fixes](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases).
Vercel currently supports Node.js 24, so deployments use the latest available
24.x patch. Vercel manages patch versions; verify the deployed runtime is at
least 24.22.1. Local development uses Node.js 26.

TypeScript 7 provides the `tsc` compiler through the `@typescript/native` alias.
The `typescript` dependency aliases `@typescript/typescript6` because ESLint's
TypeScript parser still requires its compiler API. This follows
[Microsoft's compatibility guidance](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0).

Use Bun 1.4.4, pinned in `package.json`, to resolve the TypeScript aliases.

Install dependencies:

```bash
bun install
```

Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint
- `bun format` - Format code with Prettier

## Project Structure

- `app/` - Next.js app router pages and routes
- `components/` - Reusable React components
- `domain/` - Domain-specific schemas and types
- `lib/` - Utility functions
- `public/` - Static assets

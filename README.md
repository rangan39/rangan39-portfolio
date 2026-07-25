# rangan39 portfolio

A filesystem-style personal portfolio built with Next.js 16, TypeScript,
Tailwind CSS, and shadcn/ui conventions. The project is configured for both
Vercel and OpenAI Sites-compatible deployment.

## Local development

```bash
npm install
npm run dev
npm run build
```

The development server runs at `http://localhost:3000`.

## Project structure

- `app/` — page shell, metadata, and global styles
- `components/portfolio-explorer.tsx` — interactive filesystem portfolio
- `components/ui/` — shadcn/ui-style primitives
- `lib/utils.ts` — shared class-name utility

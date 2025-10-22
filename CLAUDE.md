# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application using React 19, TypeScript, and Tailwind CSS v4. The application demonstrates Next.js App Router features including dynamic routes, internationalization patterns, and the experimental `use cache` directive.

## Commands

### Development
```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## Architecture

### App Router Structure

The application uses Next.js App Router with multiple routing patterns:

1. **Root Route** (`app/page.tsx`): Standard homepage
2. **Locale-based Routes** (`app/[locale]/*`): Dynamic locale routing with nested layouts
   - Static pages: `app/[locale]/static/page.tsx` and `app/[locale]/nested/static/page.tsx`
   - Dynamic pages: `app/[locale]/dynamic/page.tsx` and `app/[locale]/nested/dynamic/page.tsx`
3. **Feature Routes** (`app/foo/*`): Separate route group with its own layout

### Caching Strategy

- **Component Caching Enabled**: `cacheComponents: true` in next.config.ts
- **Use Cache Directive**: Several layouts use the experimental `'use cache'` directive (app/[locale]/layout.tsx, app/foo/layout.tsx)
- Static pages use `'use cache'` to optimize performance
- Dynamic pages do NOT use `'use cache'` to handle runtime params/searchParams

### Layout Hierarchy

The app has nested layouts creating a multi-level rendering pipeline:

1. Root layout (`app/layout.tsx`): Sets up fonts (Geist Sans, Geist Mono), metadata, and wraps children in Suspense
2. Locale layout (`app/[locale]/layout.tsx`): Cached layout with 1s fake delay for testing
3. Nested locale layout (`app/[locale]/nested/layout.tsx`): Additional nested layout
4. Foo layout (`app/foo/layout.tsx`): Separate cached layout for the `/foo` route group

### Async Params Handling

Next.js 16 requires awaiting dynamic params and searchParams:

- **Static pages**: `params = await params` before accessing
- **Dynamic pages**: `await Promise.all([searchParams, params])` to unwrap both simultaneously
- This is required even though TypeScript types don't reflect the Promise nature

### Path Aliases

TypeScript is configured with `@/*` pointing to the root directory, enabling clean imports:
```typescript
import {fakeAwait} from '@/utils/fakeAwait';
```

## Key Files

- `utils/fakeAwait.ts`: Utility function for simulating async delays (used for testing cache/Suspense behavior)
- `app/globals.css`: Global Tailwind styles
- `next.config.ts`: Next.js configuration with component caching enabled
- `tsconfig.json`: TypeScript configuration with strict mode and path aliases

## Important Patterns

When creating new pages:
- Use `'use cache'` directive for static/cacheable pages only
- Always await `params` and `searchParams` in page components
- Wrap async content in Suspense boundaries with meaningful fallbacks
- Follow the established pattern: dynamic pages should handle searchParams with Promise.all

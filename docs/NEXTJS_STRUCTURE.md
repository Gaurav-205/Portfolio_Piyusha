# Next.js App Router Structure

This document explains the folder structure for the Next.js frontend application using App Router, Tailwind CSS, and TypeScript.

## Frontend Structure (`/frontend`)

```
frontend/
├── app/                      # Next.js App Router directory
│   ├── api/                 # API routes (Next.js API routes)
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles with Tailwind
│   └── favicon.ico          # Favicon
│
├── components/              # Reusable UI components
├── lib/                     # Utility functions and helpers
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript type definitions
│
├── public/                  # Static files
│
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── postcss.config.mjs       # PostCSS configuration (Tailwind)
└── package.json             # Dependencies
```

## Directory Purposes

### `/app` - Next.js App Router
**Purpose**: Routing and layouts using the App Router convention

- **`app/layout.tsx`**: Root layout component that wraps all pages
- **`app/page.tsx`**: Home page (route: `/`)
- **`app/globals.css`**: Global CSS with Tailwind imports
- **`app/api/`**: Next.js API routes
  - Example: `app/api/users/route.ts` → `/api/users`
- **Route Groups** (optional): Use `(folder)` syntax to organize routes
  - Example: `app/(marketing)/about/page.tsx` → `/about`
  - Example: `app/(admin)/dashboard/page.tsx` → `/dashboard`

### `/components`
**Purpose**: Reusable UI components

Examples:
- `Button.tsx`
- `Input.tsx`
- `Card.tsx`
- `Modal.tsx`
- `Navbar.tsx`

### `/lib`
**Purpose**: Utility functions, helpers, and shared logic

Examples:
- `utils.ts` - General utilities
- `constants.ts` - App constants
- `api-client.ts` - API client configuration
- `format.ts` - Formatting functions
- `validation.ts` - Validation helpers

### `/hooks`
**Purpose**: Custom React hooks

Examples:
- `useLocalStorage.ts` - LocalStorage hook
- `useApi.ts` - API call hook
- `useDebounce.ts` - Debounce hook

### `/types`
**Purpose**: TypeScript type definitions

Examples:
- `api.ts` - API response types
- `common.ts` - Common types

### `/public`
**Purpose**: Static files served at root path

Examples:
- `favicon.ico`
- `images/logo.svg`
- `robots.txt`

## Next.js App Router Features

### Route Groups `(folder)`
- Parentheses in folder names create route groups
- Don't affect the URL structure
- Useful for organizing routes with shared layouts
- Example: `(marketing)/about/page.tsx` → `/about` (not `/marketing/about`)

### File-based Routing
- `page.tsx` = Route component
- `layout.tsx` = Layout component
- `loading.tsx` = Loading UI
- `error.tsx` = Error UI
- `not-found.tsx` = 404 page
- `route.ts` = API route handler

## Tailwind CSS Integration

Tailwind CSS v4 is configured via:
- `postcss.config.mjs` - PostCSS plugin
- `app/globals.css` - Contains `@import "tailwindcss"`
- Classes can be used directly in components

## TypeScript Configuration

- `tsconfig.json` - TypeScript compiler options
- Path alias configured: `@/*` maps to root
- Strict mode enabled
- React JSX support configured

## Best Practices

1. **Components**: Use PascalCase naming (`Button.tsx`)
2. **Utilities**: Use camelCase naming (`formatDate.ts`)
3. **Types**: Use PascalCase for types/interfaces (`User`, `ApiResponse`)
4. **Route Groups**: Use parentheses for organization without affecting URLs
5. **Co-location**: Place related files near each other when possible
6. **Server Components**: Default to Server Components, use `'use client'` when needed

## Example File Structure

```
frontend/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── api/
│   │   └── users/
│   │       └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   └── layout/
│       └── Navbar.tsx
├── lib/
│   ├── utils.ts
│   └── api-client.ts
├── hooks/
│   └── useLocalStorage.ts
└── types/
    └── api.ts
```
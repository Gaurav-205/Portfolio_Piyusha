# Backend Setup Guide

## Overview

The backend is a clean Express.js API server with TypeScript, ready to build RESTful APIs.

## Structure

```
backend/
├── src/
│   ├── api/           # API controllers
│   ├── config/        # Configuration files
│   ├── middleware/    # Express middleware (error handler, not found)
│   ├── models/        # Database models
│   ├── routes/        # Route definitions
│   ├── services/      # Business logic services
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── validators/    # Input validation
│   ├── migrations/    # Database migrations
│   ├── seeds/         # Database seed files
│   └── index.ts       # Server entry point
├── dist/              # Compiled JavaScript (generated after build)
├── package.json
├── tsconfig.json
└── .gitignore
```

## Getting Started

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   - Copy `env.example` to `.env`
   - Update variables as needed

3. **Start development server:**
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000` (or PORT from .env).

## Key Files

### `src/index.ts`
Main server entry point. Sets up Express app, middleware, and routes.

### `src/config/index.ts`
Centralized configuration management. Loads environment variables.

### `src/routes/index.ts`
Main routes file. Add your API routes here or create route modules.

### `src/middleware/`
- `errorHandler.ts` - Global error handling middleware
- `notFound.ts` - 404 handler for undefined routes

## API Endpoints

Currently available:
- `GET /` - Welcome message
- `GET /health` - Health check endpoint
- `GET /api` - API routes info

## Adding New Features

### Create a new route:
1. Create a route file in `src/routes/`
2. Import and use in `src/routes/index.ts` or `src/index.ts`

Example:
```typescript
// src/routes/users.ts
import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.json({ users: [] });
});

export default router;
```

### Add middleware:
1. Create middleware in `src/middleware/`
2. Import and use in `src/index.ts`

### Add a service:
1. Create service file in `src/services/`
2. Import and use in routes or controllers

## Development Tips

- The dev server uses `tsx` for hot reloading
- Save files and the server will automatically restart
- Check console for server logs and errors
- Use TypeScript for type safety

## Production

1. **Build:**
   ```bash
   npm run build
   ```

2. **Start:**
   ```bash
   npm start
   ```

This runs the compiled JavaScript from the `dist/` directory.

## Next Steps

- Add database integration (MongoDB, PostgreSQL, etc.)
- Add authentication middleware
- Create API controllers in `src/api/`
- Add input validation in `src/validators/`
- Set up database models in `src/models/`

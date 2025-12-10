# Backend - Express API with TypeScript

A clean Express.js backend with TypeScript, ready for building RESTful APIs.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Structure

```
backend/
├── src/
│   ├── api/           # API controllers
│   ├── config/        # Configuration files
│   ├── middleware/    # Express middleware
│   ├── models/        # Database models
│   ├── routes/        # Route definitions
│   ├── services/      # Business logic
│   ├── types/         # TypeScript types
│   ├── utils/         # Utility functions
│   ├── validators/    # Input validation
│   └── index.ts       # Entry point
├── dist/              # Compiled JavaScript (generated)
├── package.json
└── tsconfig.json
```

## Available Scripts

- `npm run dev` - Start development server with hot reload (tsx watch)
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
```

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Package Manager**: npm

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /api` - API routes info

## Development

The server runs on `http://localhost:5000` by default (or PORT from .env).

The development server uses `tsx` for hot reloading - just save your files and the server will restart automatically.

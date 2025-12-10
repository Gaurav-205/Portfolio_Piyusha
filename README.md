# Piyusha - Creative Portfolio

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)

A stunning creative portfolio website featuring an immersive 3D gallery experience and modern design.

[Live Demo](#) • [Getting Started](#getting-started) • [Features](#features)

</div>

## Features

### Portfolio Experience
- ✅ **3D Gallery Landing** - Immersive WebGL-powered photo gallery with cloth physics
- ✅ **Interactive Navigation** - Mouse wheel, keyboard, and touch controls
- ✅ **Auto-play Mode** - Resumes after user inactivity
- ✅ **Responsive Design** - Works seamlessly across all devices
- ✅ **WebGL Fallback** - Graceful degradation for unsupported browsers

### Frontend
- ✅ **Next.js 16** - Latest App Router with React 19
- ✅ **Three.js Integration** - Advanced 3D graphics with React Three Fiber
- ✅ **TypeScript** - Type safety throughout
- ✅ **Tailwind CSS v4** - Modern utility-first styling
- ✅ **Custom Shaders** - WebGL shaders for realistic cloth effects

### Backend
- ✅ **Express.js API** - Ready for portfolio data management
- ✅ **TypeScript** - Type-safe backend code
- ✅ **CORS Configured** - Ready for frontend integration

### Performance
- ✅ **Optimized 3D Rendering** - Efficient WebGL performance
- ✅ **Image Optimization** - Next.js automatic image optimization
- ✅ **Fast Loading** - Optimized bundle sizes

## Project Structure

```
├── frontend/              # Next.js frontend application
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # Reusable UI components
│   ├── lib/               # Utility functions and helpers
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript type definitions
│   └── public/            # Public static files
│
├── backend/               # Express backend API server
│   └── src/
│       ├── api/           # API controllers
│       ├── config/        # Configuration files
│       ├── middleware/    # Express middleware
│       ├── models/        # Database models
│       ├── routes/        # Route definitions
│       ├── services/      # Business logic
│       ├── types/         # TypeScript types
│       ├── utils/         # Utility functions
│       ├── validators/    # Input validation
│       └── index.ts       # Server entry point
│
├── tests/                 # Test files
├── docs/                  # Documentation
├── config/                # Shared configuration
└── scripts/               # Build/deployment scripts
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install frontend dependencies:
```bash
cd frontend
npm install
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

### Development

Start frontend development server:
```bash
cd frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

Start backend development server:
```bash
cd backend
npm run dev
```
Backend runs on [http://localhost:5000](http://localhost:5000) by default.

## Available Scripts

### Frontend (`cd frontend`)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend (`cd backend`)
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Technologies

- **Frontend**: Next.js 16 (App Router) with React 19
- **Styling**: Tailwind CSS v4
- **Backend**: Express.js with Node.js
- **Language**: TypeScript 5 (both frontend and backend)

## Documentation

- 📚 [Next.js Structure Guide](docs/NEXTJS_STRUCTURE.md) - Detailed Next.js structure
- 📚 [Backend Setup Guide](docs/BACKEND_SETUP.md) - Backend-specific documentation
- 📚 [Frontend README](frontend/README.md) - Frontend-specific setup
- 📚 [Backend README](backend/README.md) - Backend-specific setup
- 📚 [GitHub Setup Guide](GITHUB_SETUP.md) - How to push to GitHub

## Project Status

✅ **Production Ready** - Fully configured and ready to use
✅ **TypeScript** - Type-safe code throughout
✅ **Well Documented** - Comprehensive documentation included
✅ **Modern Stack** - Latest versions of all technologies

## Contributing

This is a base template. Feel free to fork it and customize it for your needs!

If you find any issues or have suggestions, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Ready to build something amazing!** 🚀

Made with ❤️ for developers

</div>
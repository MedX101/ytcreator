# YouTube Content Creator - AI-Powered Script Generator

**🎯 First Working Version (v1.0.0)**

An AI-powered YouTube content creation platform that helps creators analyze successful videos and generate new scripts in the same style. Built with React Router v7, Convex, Clerk, Polar.sh, and Google's Gemini AI.

## ✨ Key Features (v1.0.0)

### 🎬 Core Functionality
- **Video Transcription** - Extract full transcripts from YouTube videos using Gemini 2.0 Flash
- **Style Analysis** - AI-powered analysis of video tone, language, pacing, and engagement techniques  
- **Script Generation** - Create new video scripts that match the analyzed style
- **Script Refinement** - Iteratively improve generated scripts with AI assistance

### 🔧 Platform Features
- **User Authentication** - Secure login/signup with Clerk
- **Subscription Management** - Tiered pricing with Polar.sh integration
- **Real-time Database** - Convex backend for storing transcripts, analyses, and scripts
- **Responsive Dashboard** - Modern UI with sidebar navigation
- **TypeScript** - Full type safety throughout the application

## 🚀 What's Working in v1.0.0

✅ **Video Transcription Pipeline**
- Users can input YouTube URLs
- Gemini AI extracts detailed transcripts with timestamps
- Transcripts stored in Convex database

✅ **Style Analysis Engine**  
- AI analyzes tone, voice, language style, pacing
- Identifies engagement techniques and content structure
- Extracts unique characteristics and target audience insights

✅ **Script Generation System**
- Creates new scripts based on analyzed style profiles
- Maintains authentic voice while covering new topics
- Supports different video lengths (short, medium, long)
- Includes timestamp markers and visual cues

✅ **User Management**
- Clerk authentication integration
- User-specific data isolation
- Session management

✅ **Database Schema**
- `transcripts` - Stores original YouTube video transcripts
- `styleAnalyses` - AI-generated style profiles  
- `generatedScripts` - User's created scripts
- All with proper relationships and metadata

## 🏗️ Tech Stack

### Frontend
- **React Router v7** - Full-stack React framework with SSR
- **TailwindCSS v4** - Modern utility-first CSS
- **shadcn/ui** - Component library with Radix UI
- **TypeScript** - Complete type safety

### Backend & AI
- **Convex** - Real-time serverless database
- **Google Gemini AI** - Video transcription and content analysis
  - `gemini-2.0-flash-exp` for video processing
  - `gemini-1.5-flash` for text analysis and generation
- **Clerk** - Authentication and user management
- **Polar.sh** - Subscription and billing management

### Development
- **Vite** - Fast build tool and development server
- **TypeScript** - Type checking and safety

## 📋 Current Working Status

### ✅ Fully Functional
1. **Video Transcription** - Working with Gemini 2.0 Flash
2. **Style Analysis** - Complete AI-powered analysis pipeline
3. **Script Generation** - Generates scripts matching analyzed styles
4. **User Authentication** - Clerk integration working
5. **Database Operations** - All CRUD operations functional
6. **TypeScript Compilation** - All type errors resolved

### 🔄 Known Areas for Improvement
- Video transcription accuracy could be enhanced
- UI/UX refinements needed
- Error handling improvements
- Performance optimizations

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- Google Gemini API key
- Clerk account for authentication  
- Convex account for database
- Polar.sh account for subscriptions (optional)

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd ytcreator
npm install
```

2. **Set up environment variables in `.env.local`:**
```bash
# Convex Configuration
CONVEX_DEPLOYMENT=your_convex_deployment_here
VITE_CONVEX_URL=your_convex_url_here

# Clerk Authentication  
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Polar.sh Configuration (optional)
POLAR_ACCESS_TOKEN=your_polar_access_token_here
POLAR_ORGANIZATION_ID=your_polar_organization_id_here
POLAR_WEBHOOK_SECRET=your_polar_webhook_secret_here

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

3. **Initialize Convex:**
```bash
npx convex dev
```

4. **Start development server:**
```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 📁 Project Structure

```
├── app/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── dashboard/       # Dashboard-specific components  
│   │   ├── homepage/        # Landing page components
│   │   └── logos/           # Brand logos and icons
│   ├── routes/
│   │   ├── dashboard/       # Protected dashboard routes
│   │   │   ├── youtube/     # YouTube-specific features
│   │   │   │   ├── transcribe.tsx
│   │   │   │   ├── library.tsx
│   │   │   │   ├── generate.tsx
│   │   │   │   └── refine.tsx
│   │   │   └── index.tsx
│   │   ├── home.tsx
│   │   ├── pricing.tsx
│   │   └── sign-in.tsx
│   └── hooks/               # Custom React hooks
├── convex/
│   ├── youtube.ts          # Core YouTube processing functions
│   ├── auth.config.ts      # Clerk authentication config
│   ├── subscriptions.ts    # Polar.sh integration  
│   └── schema.ts           # Database schema definitions
└── public/                 # Static assets
```

## 🎯 Core Functions (Convex)

### Actions (External API calls)
- `transcribeVideo` - Extract transcript from YouTube URL using Gemini
- `analyzeStyle` - Analyze video style and tone with AI
- `generateScript` - Create new script based on style analysis
- `refineScript` - Improve existing scripts with AI feedback

### Mutations (Database writes)
- `storeTranscript` - Save video transcripts
- `storeStyleAnalysis` - Save AI-generated style profiles
- `storeGeneratedScript` - Save user's generated scripts
- `updateScript` - Update scripts with refinements

### Queries (Database reads)
- `getUserTranscripts` - Get user's transcript library
- `getUserStyleAnalyses` - Get user's style analyses
- `getUserScripts` - Get user's generated scripts
- `getTranscript`, `getStyleAnalysis`, `getScript` - Get specific items

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start dev server with HMR
npx convex dev          # Start Convex backend

# Production  
npm run build           # Build for production
npm run start           # Start production server

# Type Checking
npm run typecheck       # Run TypeScript checks
```

## 📝 Version History

### v1.0.0 - First Working Version (Current)
- ✅ Complete video transcription pipeline
- ✅ AI-powered style analysis  
- ✅ Script generation system
- ✅ User authentication and data persistence
- ✅ All TypeScript errors resolved
- ✅ Full Convex backend integration
- ✅ Working Gemini AI integration

### Next Planned Features
- Enhanced transcription accuracy
- Batch processing capabilities
- Advanced style customization
- Video upload support
- Team collaboration features
- Analytics and insights dashboard

## 🤝 Contributing

This is currently a working prototype. Future contributions welcome for:
- UI/UX improvements
- AI prompt optimization
- Performance enhancements
- Additional AI model integrations
- Testing infrastructure

## 📄 License

MIT License - Feel free to use this as a foundation for your own YouTube content creation tools.

---

**🎬 Transform your YouTube content creation with AI-powered style analysis and script generation.**

Built with ❤️ using React Router v7, Convex, Google Gemini AI, and modern web technologies.
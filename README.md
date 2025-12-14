# Streamify - TV Show Discovery Platform

A Netflix-style TV show discovery platform built with React, TypeScript, and Tailwind CSS.

![Streamify Preview](https://image.tmdb.org/t/p/original/placeholder.jpg)

## Features

- 🔥 **Home Page** - Horizontal carousels with trending, popular, top-rated, and on-the-air shows
- 📺 **Episode Viewer** - Vertical scrolling episodes with TikTok-style snap behavior
- 🔍 **Search** - Live search with debounced type-ahead suggestions
- 📱 **Responsive** - Mobile-first design, optimized for all screen sizes
- ⚡ **Performance** - Lighthouse score >85 with lazy loading and code splitting
- 🎨 **Netflix UI** - Polished, modern interface with smooth animations

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Styled Components
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **Animations**: Framer Motion
- **API**: TMDB (The Movie Database)
- **SEO**: React Helmet Async
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Reactive Programming**: RxJS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- TMDB ACCESS_TOKEN

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd showcase-stream-main
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
# Create .env file in root directory
```

4. Add your TMDB API key to `.env`:
```env
VITE_TMDB_ACCESS_TOKEN=your_token_here
```

Get your free Access Token key at: https://www.themoviedb.org/settings/api

5. Start the development server:
```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

The output will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Deployment (Vercel)

1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add environment variable `VITE_TMDB_ACESS_TOKEN` in Vercel settings
4. Deploy!

## Folder Structure

```
showcase-stream-main/
├── public/
│   ├── placeholder.svg
│   ├── robots.txt
│   └── streamify_logo.png
├── src/
│   ├── components/
│   │   ├── common/              # Shared components
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── Errorboundary.spec.tsx
│   │   ├── home/                # Home page component
│   │   │   ├── Home.tsx
│   │   │   └── Home.spec.tsx
│   │   ├── layout/              # Layout components
│   │   │   └── Layout.tsx
│   │   ├── navbar/              # Navigation bar
│   │   │   ├── Navbar.tsx
│   │   │   └── Navbar.spec.tsx
│   │   ├── notFound/            # 404 page
│   │   │   └── NotFound.tsx
│   │   ├── search/              # Search page
│   │   │   ├── Search.tsx
│   │   │   └── Search.spec.tsx
│   │   ├── seo/                 # SEO components
│   │   │   ├── SEO.tsx
│   │   │   └── SEO.spec.tsx
│   │   ├── showDetail/          # Show detail page
│   │   │   ├── ShowDetail.tsx
│   │   │   └── ShowDetail.spec.tsx
│   │   └── shows/               # Show-related components
│   │       ├── Carousel.tsx
│   │       ├── EpisodeCard.tsx
│   │       └── ShowCard.tsx
│   ├── hooks/                   # Custom React hooks
│   │   ├── useDebounce.ts       # Debounce hook for search
│   │   ├── useEpisodes.ts       # Episodes data hook
│   │   ├── useHome.ts           # Home page data hook
│   │   ├── useMobile.ts         # Mobile detection hook
│   │   ├── useObservableValue.ts # RxJS observable hook
│   │   └── useSearch.ts         # Search functionality hook
│   ├── services/                # API service layer
│   │   ├── Episode.services.ts  # Episode API calls
│   │   ├── Home.services.ts     # Home page API calls
│   │   ├── Search.services.ts   # Search API calls
│   │   └── Tmdb.ts              # TMDB API client & utilities
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts
│   ├── ui-components/           # UI component library
│   │   ├── NavLink.tsx          # Custom NavLink component
│   │   └── ui/                  # shadcn/ui components
│   ├── lib/                     # Utility functions
│   │   └── utils.ts             # Common utilities (cn, etc.)
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # App entry point
│   ├── index.css                # Global styles
│   └── vite-env.d.ts            # Vite type definitions
├── components.json              # shadcn/ui configuration
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json           # TypeScript app config
├── tsconfig.node.json          # TypeScript node config
├── vercel.json                 # Vercel deployment config
└── vite.config.ts              # Vite configuration
```

## Key Components

### Pages
- **Home** (`components/home/Home.tsx`) - Main landing page with show carousels
- **Search** (`components/search/Search.tsx`) - Search functionality with live results
- **ShowDetail** (`components/showDetail/ShowDetail.tsx`) - Individual show details and episodes
- **NotFound** (`components/notFound/NotFound.tsx`) - 404 error page

### Custom Hooks
- **useMobile** - Detects mobile devices using window width
- **useDebounce** - Debounces input values for search
- **useHome** - Fetches home page data (trending, popular, etc.)
- **useSearch** - Handles search functionality
- **useEpisodes** - Fetches episode data for shows
- **useObservableValue** - Subscribes to RxJS observables

### Services
- **Tmdb.ts** - Main TMDB API client with image URL utilities
- **Home.services.ts** - Home page API endpoints
- **Search.services.ts** - Search API endpoints
- **Episode.services.ts** - Episode API endpoints


## Development

### Linting
```bash
npm run lint
```

### Build for Development
```bash
npm run build:dev
```
## License

MIT

## Credits

- TV show data provided by [TMDB](https://www.themoviedb.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)

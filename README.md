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
- **State Management**: React Query + Context API
- **Animations**: Framer Motion
- **API**: TMDB (The Movie Database)
- **SEO**: React Helmet Async

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- TMDB API key (free)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd streamify
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from template:
```bash
cp .env.example .env
```

4. Add your TMDB API key to `.env`:
```env
VITE_TMDB_API_KEY=your_api_key_here
```

Get your free API key at: https://www.themoviedb.org/settings/api

5. Start the development server:
```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

The output will be in the `dist` folder.

## Deployment (Vercel)

1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add environment variable `VITE_TMDB_API_KEY` in Vercel settings
4. Deploy!

## Folder Structure

```
src/
├── components/
│   ├── common/          # Shared components (ErrorBoundary)
│   ├── layout/          # Layout components (Navbar, Layout)
│   ├── search/          # Search components (SearchBar)
│   ├── seo/             # SEO components (SEO)
│   ├── shows/           # Show-related components (Carousel, ShowCard, EpisodeCard)
│   └── ui/              # UI primitives (shadcn/ui + custom)
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── services/            # API service layer
├── types/               # TypeScript type definitions
└── lib/                 # Utility functions
```

## Performance Optimizations

- **Lazy Loading**: Pages are code-split and lazy-loaded
- **Image Optimization**: Uses TMDB's responsive image URLs
- **API Caching**: React Query handles caching and deduplication
- **Debounced Search**: Prevents excessive API calls
- **Preconnect**: DNS prefetch for TMDB domains

## Known Issues / Future Improvements

- Add user authentication for favorites/watchlist
- Implement infinite scroll for search results
- Add video trailer playback
- Dark/light theme toggle

## License

MIT

## Credits

- TV show data provided by [TMDB](https://www.themoviedb.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

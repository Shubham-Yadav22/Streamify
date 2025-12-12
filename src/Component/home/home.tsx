import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Star, Play, Tv, AlertCircle } from 'lucide-react';
import { Layout } from '@/Component/layout/layout';
import { Carousel } from '@/Component/shows/Carousel';
import { SEO } from '@/Component/seo/seo';
// import { CarouselSkeleton } from '@/components/ui/loading-skeleton';
import {
  useTrendingShows,
  usePopularShows,
  useTopRatedShows,
  useOnTheAirShows,
} from '@/hooks/useHome';
import { TMDBResponse, TVShow } from '@/types';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const hasApiKey = API_KEY && API_KEY.trim() !== '' && API_KEY !== 'demo_key';

// Hero component
const Hero = () => (
  <section className="relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
    {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
    
    {/* Animated shapes */}
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </div>

    <div className="relative container mx-auto px-4 pb-12 md:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
          Discover Your Next
          <span className="text-primary"> Favorite Show</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Explore trending TV series, browse episodes, and find something amazing to watch tonight.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#trending"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Play size={20} />
            Start Browsing
          </a>
          <a
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
          >
            <Tv size={20} />
            Search Shows
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

// API Key Warning Banner
const ApiKeyWarning = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 md:p-6 mx-4 md:mx-8 mb-6"
  >
    <div className="flex items-start gap-3">
      <AlertCircle className="text-yellow-500 flex-shrink-0 mt-0.5" size={20} />
      <div>
        <h3 className="font-semibold text-yellow-500 mb-1">TMDB API Key Required</h3>
        <p className="text-sm text-muted-foreground mb-3">
          To see real TV show data, you need to add your TMDB API key.
        </p>
        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
          <li>Get a free API key from <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TMDB</a></li>
          <li>Create a <code className="bg-muted px-1 rounded">.env</code> file in your project root</li>
          <li>Add: <code className="bg-muted px-1 rounded">VITE_TMDB_API_KEY=your_key_here</code></li>
          <li>Restart your development server</li>
        </ol>
      </div>
    </div>
  </motion.div>
);

const Home = () => {
  const { data: trending, isLoading: trendingLoading, error: trendingError } = useTrendingShows();
  const { data: popular, isLoading: popularLoading, error: popularError } = usePopularShows();
  const { data: topRated, isLoading: topRatedLoading, error: topRatedError } = useTopRatedShows();
  const { data: onTheAir, isLoading: onTheAirLoading, error: onTheAirError } = useOnTheAirShows();
  
  // Log errors for debugging
  if (trendingError || popularError || topRatedError || onTheAirError) {
    console.error('API Errors:', { trendingError, popularError, topRatedError, onTheAirError });
  }

  return (
      <>
      <SEO />
      <Hero />
      
      {!hasApiKey && <ApiKeyWarning />}
      
      <div className="pb-16 space-y-2">
        <section id="trending">
          <Carousel
            title="🔥 Trending This Week"
            shows={(trending as TMDBResponse<TVShow> | undefined)?.results || []}
            isLoading={trendingLoading}
          />
        </section>

        <Carousel
          title="⭐ Top Rated"
          shows={(topRated as TMDBResponse<TVShow> | undefined)?.results || []}
          isLoading={topRatedLoading}
        />

        <Carousel
          title="📺 Popular"
          shows={(popular as TMDBResponse<TVShow> | undefined)?.results || []}
          isLoading={popularLoading}
        />

        <Carousel
          title="🎬 On The Air"
          shows={(onTheAir as TMDBResponse<TVShow> | undefined)?.results || []}
          isLoading={onTheAirLoading}
        />
      </div>
      </>
  );
};

export default Home;

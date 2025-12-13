import { motion } from 'framer-motion';
import { Play, Tv } from 'lucide-react';
import { Carousel } from '@/Component/shows/Carousel';
import { SEO } from '@/Component/seo/seo';
import {
  useTrendingShows,
  usePopularShows,
  useTopRatedShows,
  useOnTheAirShows,
} from '@/hooks/useHome';
import { TMDBResponse, TVShow } from '@/types';


// Hero component
const Hero = () => {
  const handleScrollToTrending = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    // Smoothly scroll to trending section; keeps hash as fallback if JS disabled
    document.getElementById('trending')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
  <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden mt-14 sm:mt-16 md:mt-20">
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

    <div className="relative container mx-auto px-4 pb-12 md:pb-20 w-full">
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
            onClick={handleScrollToTrending}
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
};



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

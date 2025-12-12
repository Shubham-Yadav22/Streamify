import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Calendar, Tv, ChevronDown } from 'lucide-react';
import { Layout } from '@/Component/layout/layout';
import { EpisodeCard } from '@/Component/shows/EpisodeCard';
import { SEO } from '@/Component/seo/seo';
import { EpisodeCardSkeleton, LoadingSkeleton } from '@/ui-components/ui/loading-skeleton';
import { useShowDetails, useSeasonDetails } from '@/hooks/useEpisodes';
import { getImageUrl$, getBackdropUrl$ } from '@/services/tmdb';
import { cn } from '@/lib/utils';
import {useObservableValue} from '@/hooks/useObservableValue'

const ShowDetail = () => {
  const { id } = useParams<{ id: string }>();
  const showId = parseInt(id || '0', 10);
  
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [isSeasonDropdownOpen, setIsSeasonDropdownOpen] = useState(false);
  const episodeContainerRef = useRef<HTMLDivElement>(null);

  const { data: show, isLoading: showLoading, isError: showError } = useShowDetails(showId);
  const { data: season, isLoading: seasonLoading } = useSeasonDetails(showId, selectedSeason);

  // Set default season to first available
  useEffect(() => {
    if (show?.seasons && show.seasons.length > 0) {
      const firstSeason = show.seasons.find(s => s.season_number > 0) || show.seasons[0];
      setSelectedSeason(firstSeason.season_number);
    }
  }, [show]);

  if (showError) {
    return (
      <Layout>
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Show not found</h1>
            <Link to="/" className="text-primary hover:underline">
              Return to Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const backdropUrl = useObservableValue(
    getBackdropUrl$(show?.backdrop_path),
    null
  );
  
  const posterUrl = useObservableValue(
    getImageUrl$(show?.poster_path, 'w500'),
    null
  );
  
  const year = show?.first_air_date
    ? new Date(show.first_air_date).getFullYear()
    : null;
  
  const availableSeasons =
    show?.seasons?.filter(s => s.season_number > 0) || [];

  return (
    <>
      <SEO 
        title={show?.name || 'Loading...'}
        description={show?.overview || ''}
        image={backdropUrl || undefined}
      />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh]">
        {/* Backdrop */}
        {backdropUrl && (
          <div className="absolute inset-0">
            <img
              src={backdropUrl}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="relative pt-24 md:pt-32 pb-8 ">
          <div className="container mx-auto px-4">
            {/* Back button */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>

            {showLoading ? (
              <div className="flex flex-col md:flex-row gap-8">
                <LoadingSkeleton className="w-48 md:w-64 aspect-[2/3] rounded-xl" />
                <div className="flex-1 space-y-4">
                  <LoadingSkeleton className="w-3/4 h-10" />
                  <LoadingSkeleton className="w-1/2 h-6" />
                  <LoadingSkeleton className="w-full h-24" />
                </div>
              </div>
            ) : show && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row gap-8"
              >
                {/* Poster */}
                <div className="flex-shrink-0">
                  <div className="w-48 md:w-64 aspect-[2/3] rounded-xl overflow-hidden bg-muted shadow-2xl">
                    {posterUrl ? (
                      <img
                        src={posterUrl}
                        alt={show.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No poster
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-4">
                  <h1 className="text-3xl md:text-5xl font-bold text-foreground">
                    {show.name}
                  </h1>

                  {show.tagline && (
                    <p className="text-lg text-muted-foreground italic">
                      "{show.tagline}"
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{show.vote_average.toFixed(1)}</span>
                      <span className="text-muted-foreground">({show.vote_count} votes)</span>
                    </div>
                    {year && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar size={16} />
                        <span>{year}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Tv size={16} />
                      <span>{show.number_of_seasons} Season{show.number_of_seasons !== 1 ? 's' : ''}</span>
                    </div>
                    {show.status && (
                      <span className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        show.status === 'Returning Series' ? 'bg-green-500/20 text-green-400' :
                        show.status === 'Ended' ? 'bg-muted text-muted-foreground' :
                        'bg-primary/20 text-primary'
                      )}>
                        {show.status}
                      </span>
                    )}
                  </div>

                  {/* Genres */}
                  {show.genres && show.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {show.genres.map(genre => (
                        <span
                          key={genre.id}
                          className="px-3 py-1 bg-secondary rounded-full text-sm text-secondary-foreground"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-muted-foreground max-w-2xl leading-relaxed">
                    {show.overview || 'No description available.'}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Episodes</h2>

            {/* Season Selector */}
            {availableSeasons.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setIsSeasonDropdownOpen(!isSeasonDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <span>Season {selectedSeason}</span>
                  <ChevronDown size={18} className={cn(
                    'transition-transform',
                    isSeasonDropdownOpen && 'rotate-180'
                  )} />
                </button>

                <AnimatePresence>
                  {isSeasonDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 bg-popover border border-border rounded-lg shadow-xl overflow-hidden z-10 min-w-[150px]"
                    >
                      {availableSeasons.map(s => (
                        <button
                          key={s.id}
                          onClick={() => {
                            setSelectedSeason(s.season_number);
                            setIsSeasonDropdownOpen(false);
                          }}
                          className={cn(
                            'w-full px-4 py-2 text-left hover:bg-muted transition-colors',
                            s.season_number === selectedSeason && 'bg-muted text-primary'
                          )}
                        >
                          Season {s.season_number}
                          <span className="text-xs text-muted-foreground ml-2">
                            ({s.episode_count} eps)
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Episode List */}
          <div
            ref={episodeContainerRef}
            className="space-y-4 md:space-y-3"
          >
            {seasonLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <EpisodeCardSkeleton key={i} />
              ))
            ) : season?.episodes && season.episodes.length > 0 ? (
              season.episodes.map((episode, index) => (
                <EpisodeCard
                  key={episode.id}
                  episode={episode}
                  index={index}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No episodes available for this season.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShowDetail;

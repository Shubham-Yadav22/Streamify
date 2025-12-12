import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Episode } from '@/types';
import { getImageUrl$ } from '@/services/tmdb';
import { useMemo, useState } from 'react';
import { useObservableValue } from '@/hooks/useObservableValue';
import { cn } from '@/lib/utils';

interface EpisodeCardProps {
  episode: Episode;
  index?: number;
  onPlay?: () => void;
}

export const EpisodeCard = ({ episode, index = 0, onPlay }: EpisodeCardProps) => {
  const [showFullOverview, setShowFullOverview] = useState(false);
  const stillUrl$ = useMemo(() => getImageUrl$(episode.still_path, 'w300'),
    null
  )
  const stillUrl = useObservableValue(stillUrl$, null)
  const overviewText = episode.overview || 'No description available';
  const isLongOverview = overviewText.length > 200;
  const displayOverview = showFullOverview || !isLongOverview
    ? overviewText
    : `${overviewText.slice(0, 200).trimEnd()}…`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="snap-start w-full flex-shrink-0"
    >
      <div className="bg-card rounded-lg md:rounded-xl overflow-hidden group hover:ring-2 hover:ring-primary/50 transition-all duration-300 flex">
        {/* Episode thumbnail - Left section (40%) */}
        <div className="relative w-[40%] bg-muted aspect-video overflow-hidden flex items-center justify-center flex-shrink-0">
          {stillUrl ? (
            <img
              src={stillUrl}
              alt={episode.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary">
              <span className="text-muted-foreground text-xs">No preview available</span>
            </div>
          )}
          
          {/* Play overlay */}
          <div
            onClick={onPlay}
            className={cn(
              'absolute inset-0 flex items-center justify-center',
              'bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
            )}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
              <Play size={18} className="md:hidden text-primary-foreground ml-1" fill="currentColor" />
              <Play size={20} className="hidden md:block text-primary-foreground ml-1" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Episode info - Right section (60%) */}
        <div className="flex-1 p-4 md:p-5 flex flex-col justify-center">
          <h3 className="font-semibold text-sm md:text-base text-foreground mb-2 line-clamp-2">
            {episode.name}
          </h3>

          <div className="md:pb-10 space-y-1">
            <p className={cn(
              'text-muted-foreground text-xs',
              showFullOverview ? '' : 'line-clamp-1 md:line-clamp-1'
            )}>
              {displayOverview}
            </p>
            {isLongOverview && !showFullOverview && (
              <button
                type="button"
                onClick={() => setShowFullOverview(true)}
                className="text-xs  font-medium "
              >
                ...
              </button>
            )}
          </div>
          {episode.air_date && (
            <span className="text-xs md:text-sm text-muted-foreground">
              {new Date(episode.air_date).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

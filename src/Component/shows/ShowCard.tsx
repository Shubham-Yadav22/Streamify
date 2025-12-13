import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar } from 'lucide-react';
import { TVShow } from '@/types';
import { getImageUrl$ } from '@/services/tmdb';
import { useObservableValue } from '@/hooks/useObservableValue';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface ShowCardProps {
  show: TVShow;
  index?: number;
}

export const ShowCard = ({ show, index = 0 }: ShowCardProps) => {
  const posterUrl$ = useMemo(
    () => getImageUrl$(show.poster_path, 'w300'),
    [show.poster_path]
  );
  
  const posterUrl = useObservableValue(posterUrl$, null);  
  const year = useMemo(() => show.first_air_date ? new Date(show.first_air_date).getFullYear() : null, [show.first_air_date]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex-shrink-0 w-[140px] md:w-[180px] group"
    >
      <Link to={`/show/${show.id}`} className="block">
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={show.name}
              loading="lazy"
              className={cn(
                'w-full h-full object-cover transition-transform duration-300',
                'group-hover:scale-110'
              )}
              decoding="async"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary">
              <span className="text-muted-foreground text-sm text-center px-2">
                {show.name}
              </span>
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Rating badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className="font-medium">{show.vote_average.toFixed(1)}</span>
          </div>

          {/* Hover info */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-xs text-muted-foreground line-clamp-3">
              {show.overview || 'No description available'}
            </p>
          </div>
        </div>
        
        <div className="mt-2 space-y-1">
          <h3 className="font-medium text-sm line-clamp-1 text-foreground group-hover:text-primary transition-colors">
            {show.name}
          </h3>
          {year && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar size={12} />
              <span>{year}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

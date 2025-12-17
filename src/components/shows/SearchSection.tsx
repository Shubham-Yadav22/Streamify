import React from 'react'
import { getImageUrl$ } from '@/services/Tmdb';
import { useMemo } from 'react';
import { useObservableValue } from '@/hooks/useObservableValue';
import { TVShow } from '@/types';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Star, Calendar } from 'lucide-react';

interface ShowCardProps {
    show: TVShow;
    index?: number;
    variant?: 'default' | 'dropdown';
  }

  

const searchsection = (({ show, index = 0, variant = 'default' }: ShowCardProps) => {
    const posterUrl$ = useMemo(
        () => getImageUrl$(show.poster_path, 'w300'),
        [show.poster_path]
    );
      

    const posterUrl = useObservableValue(posterUrl$, null);  
    const year = useMemo(() => show.first_air_date ? new Date(show.first_air_date).getFullYear() : null, [show.first_air_date]);

    // Dropdown variant: horizontal layout with info on left and poster on right
    if (variant === 'dropdown') {
      return (
        <Link to={`/show/${show.id}`} className="block w-full group">
          <div className="flex items-center gap-3 p-2 hover:bg-muted transition-colors">
            {/* Left side: Show information */}
            <div className="flex-1 min-w-0 space-y-1">
              <h3 className="font-medium text-sm line-clamp-1 text-foreground group-hover:text-primary transition-colors">
                {show.name}
              </h3>
              {year && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  <span>{year}</span>
                </div>
              )}
              {show.overview && (
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                  {show.overview}
                </p>
              )}
              <div className="flex items-center gap-1 mt-1">
                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-medium">{show.vote_average.toFixed(1)}</span>
              </div>
            </div>
            
            {/* Right side: Poster */}
            <div className="flex-shrink-0 w-16 h-20 rounded-md overflow-hidden bg-muted">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={show.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  decoding="async"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary">
                  <span className="text-muted-foreground text-xs text-center px-1">
                    {show.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Link>
      );
    }

    // Default variant: vertical layout (existing layout)
    return (

    // main div for search bar 
    <div className='flex flex-col items-center justify-center mb-2'>
    <Link to={`/show/${show.id}`} className="block group">
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
    </div>

  
    )}
)
export default searchsection
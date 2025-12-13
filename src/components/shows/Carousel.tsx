import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { TVShow } from '@/types';
import { ShowCard } from './ShowCard';
import { ShowCardSkeleton } from '@/ui-components/ui/loading-skeleton';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';

interface CarouselProps {
  title: string;
  shows: TVShow[];
  isLoading?: boolean;
}

export const Carousel = ({ title, shows, isLoading = false }: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative py-4 md:py-6"
    >
      <div className="flex items-center justify-between mb-4 px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
        
        {/* Desktop scroll buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={cn(
              'p-2 rounded-full bg-secondary text-foreground transition-all',
              canScrollLeft ? 'hover:bg-primary hover:text-primary-foreground' : 'opacity-30 cursor-not-allowed'
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={cn(
              'p-2 rounded-full bg-secondary text-foreground transition-all',
              canScrollRight ? 'hover:bg-primary hover:text-primary-foreground' : 'opacity-30 cursor-not-allowed'
            )}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScrollButtons}
        className="flex gap-4 overflow-x-auto hide-scrollbar px-4 md:px-8 pb-4 scroll-smooth"
      >
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <ShowCardSkeleton key={i} />)
          : shows.length > 0
          ? shows.map((show, index) => (
              <ShowCard key={show.id} show={show} index={index} />
            ))
          : (
              <div className="flex items-center justify-center w-full py-8 text-muted-foreground">
                <p>No shows available</p>
              </div>
            )}
      </div>
    </motion.section>
  );
};

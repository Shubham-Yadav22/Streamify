import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';
import { ShowCard } from '@/components/shows/ShowCard';
import { SEO } from '@/components/seo/SEO';
import { ShowCardSkeleton } from '@/ui-components/ui/loading-skeleton';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchShows } from '@/hooks/useSearch';

const Search = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const { data, isLoading, isError } = useSearchShows(debouncedQuery);

  const results = data?.results || [];
  const hasQuery = debouncedQuery.length >= 1;
  const hasResults = results.length > 0;

  return (
    <>
      <SEO 
        title="Search TV Shows" 
        description="Search for your favorite TV shows. Find detailed information, episodes, and more."
      />

      <div className="pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Search TV Shows
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Find your next favorite series from thousands of TV shows
            </p>
          </motion.div>

    

          {/* Live search input for real-time results */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Start typing to search..."
                className="w-full bg-secondary rounded-xl py-4 pl-12 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="min-h-[400px]">
            {!hasQuery && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <SearchIcon size={64} className="mx-auto text-muted-foreground/30 mb-4" />
              </motion.div>
            )}

            {isLoading && hasQuery && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {Array.from({ length: 15 }).map((_, i) => (
                  <ShowCardSkeleton key={i} />
                ))}
              </div>
            )}

            {isError && hasQuery && (
              <div className="text-center py-20">
                <p className="text-destructive mb-2">Something went wrong</p>
                <p className="text-muted-foreground text-sm">
                  Please try again later 
                </p>
              </div>
            )}

            {!isLoading && hasQuery && !hasResults && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-xl text-foreground mb-2">No results found</p>
                <p className="text-muted-foreground">
                  Try searching for something else
                </p>
              </motion.div>
            )}

            {!isLoading && hasResults && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <p className="text-sm text-muted-foreground">
                  Found {data?.total_results || results.length} results for "{debouncedQuery}"
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                  {results.map((show, index) => (
                    <ShowCard key={show.id} show={show} index={index} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;

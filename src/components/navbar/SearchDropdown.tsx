import SearchSection from '@/components/shows/searchsection';
import { cn } from '@/lib/utils';

interface SearchDropdownProps {
  suggestions: any[];
  isLoading: boolean;
  isError: boolean;
  hasQuery: boolean;
  onClose: () => void;
  onSelect: (id: number) => void;
}

const SearchDropdown = ({ suggestions, isLoading, isError, hasQuery, onClose, onSelect }: SearchDropdownProps) => {
  return (
    <div className="bg-secondary rounded-xl shadow-lg border border-border overflow-hidden">
      {/* Suggestions Dropdown */}
      {hasQuery && (
        <div className="max-h-[400px] overflow-y-auto">
          {isLoading && (
            <div className="px-4 py-3 text-sm text-muted-foreground text-center">Loading…</div>
          )}
          {!isLoading && isError && (
            <div className="px-4 py-3 text-sm text-destructive text-center">Error loading suggestions</div>
          )}
          {!isLoading && !isError && suggestions.length > 0 && (
            <div className="py-2">
              {suggestions.map((show) => (
                <div
                  key={show.id}
                  className={cn('hover:bg-muted cursor-pointer')}
                  onMouseDown={() => {
                    onSelect(show.id);
                    onClose();
                  }}
                >
                  <SearchSection show={show} variant="dropdown" />
                </div>
              ))}
            </div>
          )}
          {!isLoading && !isError && suggestions.length === 0 && (
            <div className="px-4 py-3 text-sm text-muted-foreground text-center">No results found</div>
          )}
        </div>
      )}

      {!hasQuery && (
        <div className="px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">Start typing to search for TV shows</p>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;


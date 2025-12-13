// hooks/useSearch.ts
import { useQuery } from '@tanstack/react-query';
import { searchShows$ } from '@/services/search.services';
import { firstValueFrom } from 'rxjs';

export const useSearchShows = (query: string) =>
  useQuery({
    queryKey: ['search', query],
    queryFn: () => firstValueFrom(searchShows$(query)),
    enabled: query.length >= 1,
    staleTime: 300_000,
  });

// hooks/useEpisodes.ts
import { useQuery } from '@tanstack/react-query';
import {
  getShowDetails$,
  getSeasonDetails$,
} from '@/services/episode.services';
import { firstValueFrom } from 'rxjs';

export const useShowDetails = (id: number) =>
  useQuery({
    queryKey: ['show', id],
    queryFn: () => firstValueFrom(getShowDetails$(id)),
    enabled: !!id,
    staleTime: 1800_000,
  });

export const useSeasonDetails = (id: number, season: number) =>
  useQuery({
    queryKey: ['season', id, season],
    queryFn: () => firstValueFrom(getSeasonDetails$(id, season)),
    enabled: !!id && season >= 0,
    staleTime: 1800_000,
  });

// hooks/useHome.ts
import { useQuery } from '@tanstack/react-query';
import {
  getTrendingShows$,
  getPopularShows$,
  getTopRatedShows$,
  getOnTheAirShows$,
} from '@/services/Home.services';
import { firstValueFrom } from 'rxjs';

export const useTrendingShows = () =>
  useQuery({
    queryKey: ['trending'],
    queryFn: () => firstValueFrom(getTrendingShows$('week')),
    staleTime: 600_000,
  });

export const usePopularShows = () =>
  useQuery({
    queryKey: ['popular'],
    queryFn: () => firstValueFrom(getPopularShows$()),
    staleTime: 600_000,
  });

export const useTopRatedShows = () =>
  useQuery({
    queryKey: ['topRated'],
    queryFn: () => firstValueFrom(getTopRatedShows$()),
    staleTime: 600_000,
  });

export const useOnTheAirShows = () =>
  useQuery({
    queryKey: ['onTheAir'],
    queryFn: () => firstValueFrom(getOnTheAirShows$()),
    staleTime: 600_000,
  });

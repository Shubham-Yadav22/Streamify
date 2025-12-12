// services/tmdb/home.service.ts
import { fetchFromTMDB$ } from '@/services/tmdb';
import { TVShow, TMDBResponse } from '@/types';

export const getTrendingShows$ = (timeWindow: 'day' | 'week' = 'week') =>
  fetchFromTMDB$<TMDBResponse<TVShow>>(`/trending/tv/${timeWindow}`);

export const getPopularShows$ = (page = 1) =>
  fetchFromTMDB$<TMDBResponse<TVShow>>('/tv/popular', {
    page: page.toString(),
  });

export const getTopRatedShows$ = (page = 1) =>
  fetchFromTMDB$<TMDBResponse<TVShow>>('/tv/top_rated', {
    page: page.toString(),
  });

export const getOnTheAirShows$ = (page = 1) =>
  fetchFromTMDB$<TMDBResponse<TVShow>>('/tv/on_the_air', {
    page: page.toString(),
  });

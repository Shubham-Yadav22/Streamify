// services/tmdb/search.service.ts
import { fetchFromTMDB$ } from '@/services/tmdb';
import { TVShow, TMDBResponse } from '@/types';

export const searchShows$ = (query: string, page = 1) =>
  fetchFromTMDB$<TMDBResponse<TVShow>>('/search/tv', {
    query,
    page: page.toString(),
  });

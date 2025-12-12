// services/tmdb/episodes.service.ts
import { fetchFromTMDB$ } from '@/services/tmdb';
import { TVShowDetails, SeasonDetails } from '@/types';

export const getShowDetails$ = (showId: number) =>
  fetchFromTMDB$<TVShowDetails>(`/tv/${showId}`);

export const getSeasonDetails$ = (showId: number, season: number) =>
  fetchFromTMDB$<SeasonDetails>(`/tv/${showId}/season/${season}`);

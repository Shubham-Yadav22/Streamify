import { TVShow, TVShowDetails, TMDBResponse, SeasonDetails } from '@/types';
import { from, throwError, Observable } from "rxjs";
import { catchError, timeout } from "rxjs/operators";

// TMDB API Configuration
const BEARER_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;


// base url ans image base url will be read from .env file
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

// Image URL helpers
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

export const getImageUrl$ = (
  path: string | null,
  size: 'w200' | 'w300' | 'w500' | 'w780' | 'original' = 'w500'
) => {
  return of(path).pipe(
    map(p => {
      if (!p) return null;
      return `${IMAGE_BASE_URL}/${size}${p}`;
    })
  );
};

export const getBackdropUrl$ = (
  path: string | null,
  size: 'w780' | 'w1280' | 'original' = 'w1280'
) => {
  return of(path).pipe(
    map(p => {
      if (!p) return null;
      return `${IMAGE_BASE_URL}/${size}${p}`;
    })
  );
};


// API request helper with timeout and better error handler 
export const fetchFromTMDB$ = <T>(
  endpoint: string,
  params: Record<string, string> = {}
): Observable<T> => {
  return new Observable<T>(subscriber => {
    const searchParams = new URLSearchParams(params);
    const url = `${BASE_URL}${endpoint}?${searchParams}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${BEARER_TOKEN}`,
      },
    })
      .then(async res => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`TMDB Error: ${res.status}`);
        const data = await res.json();
        subscriber.next(data);
        subscriber.complete();
      })
      .catch(err => {
        clearTimeout(timeoutId);
        subscriber.error(err);
      });

    return () => controller.abort();
  });
};



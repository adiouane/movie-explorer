import axios from 'axios';
import { useQuery } from 'react-query';

const BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Fetches popular movies based on the provided page number.
 * 
 * @param page - The page number to fetch popular movies from.
 * @returns An object containing the fetched data, loading state, and any errors.
 */
export const usefetchPopularMovies = (page: number) => {
    const { data, isLoading, error } = useQuery(['popularMovies', page],
      async () => {
        try {
          const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
            params: {
              api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
              page: page,
            },
          });
          const { data } = response;
          return {
            data: data.results,
            page: data.page,
            total_pages: data.total_pages,
          };
        } catch (err) {
          console.error("Error fetching popular movies:", err);
          throw err;
        }
      },
      { keepPreviousData: true }
    );
    
    return { data, isLoading, error };
  };
  
/**
 * Custom hook to search movies using the TMDB API.
 * 
 * @param search - The search query string.
 * @param page - The page number for paginated results.
 * @returns An object containing the search results data, loading state, and any errors.
 */
export const useSearchMovies = (search: string, page: number) => {
    const { data, isLoading, error } = useQuery(['searchMovies', search, page],
        async () => {
            try {
                const response = await axios.get(`${BASE_URL}/search/movie`, {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                        query: search,
                        include_adult: false,
                        language: 'en-US',
                        page: page,
                    },
                });
                const { data } = response;
                return data.results;
            } catch (err) {
                console.error("Error fetching search movies:", err);
                throw err;
            }
        },
        { keepPreviousData: true }
    );
    
    return { data, isLoading, error };
}

/**
 * Custom hook to fetch movie details using the provided movie ID.
 * 
 * @param id - The ID of the movie to fetch details for.
 * @returns An object containing the fetched movie details, loading state, and any errors that occurred during the fetch.
 */
export const useGetMovieDetails = (id: string) => {
    const { data, isLoading, error } = useQuery(['movieDetails', id],
        async () => {
            try {
                const response = await axios.get(`${BASE_URL}/movie/${id}`, {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                    },
                });
                return response.data;
            } catch (err) {


                console.error("Error fetching movie details:", err);
                throw err;
            }
        },
        { keepPreviousData: true }
    );
    return { data, isLoading, error };
  }

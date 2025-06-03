import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },  
});

export const getMovies = async (params:unknown) => {
  try {
    const response = await API.get('/movies', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Search Movies
export const searchMovies = async (query: string, params: Record<string, unknown> = {}) => {
  try {
    const response = await API.get('/search', {
      params: { movieSearch: query, ...params },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

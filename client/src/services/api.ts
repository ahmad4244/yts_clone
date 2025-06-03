import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },  
});


// Get Movies
// {{base_url}}/api/movies

// Get Movies With Filters
// {{base_url}}/api/movies?year=1995

// Get Movies With Pagination and Sorting
// {{base_url}}/api/movies?genre=Action&page=10&limit=25&sort=rating&order=desc

// Get Movies By Search
// {{base_url}}/api/search?movieSearch=batman

// Get Movies By Search with Pagination
// {{base_url}}/api/search?movieSearch=chaplin&page=1&limit=25

// Get Movies With Additional Filters
// {{base_url}}/api/movies?quality=1080p&mpaRating=PG-13
export const getMovies = async (params:any) => {
  try {
    const response = await API.get('/movies', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Search Movies
export const searchMovies = async (query: string, params:any = {}) => {
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

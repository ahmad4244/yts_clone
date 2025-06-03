import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { getMovies } from '../services/api';
const DEFAULT_FILTERS = {
    genre: '',
    rating: '',
    year: '',
    language: '',
    search: '',
    sortBy: 'title',
    order: 'asc',
    page: 1,
    limit: 25,
    quality: '',
    mpaRating: '',
  }
export const useMovieFilters = () => {
  const [filters, setFilters] = useState<MovieFilters>(DEFAULT_FILTERS);

  const [movies, setMovies] = useState<ApiResponse<Movie>[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 25,
    pages: 1,
  });
  const [loading, setLoading] = useState(false);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(
          ([, value]) => value !== '' && value !== null && value !== undefined
        )
      );
      
      const res = await getMovies(params);
      setMovies(res.data);
      setPagination(res.pagination);
    } catch (err) {
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const debouncedSearch = debounce((name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
  }, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'search') {
      debouncedSearch(name, value);
    } else {
      setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
    }
  };

  const handleSort = (sortBy: string) => {
    setFilters(prev => ({
      ...prev,
      sortBy,
      order: prev.order === 'asc' ? 'desc' : 'asc',
      page: 1,
    }));
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    setFilters(prev => {
      const newPage = direction === 'next' ? prev.page + 1 : Math.max(prev.page - 1, 1);
      return { ...prev, page: newPage };
    });
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return {
    movies,
    filters,
    pagination,
    loading,
    handleInputChange,
    handleSort,
    handlePageChange,
    resetFilters,
  };
};
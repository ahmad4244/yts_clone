import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { getMovies } from "../services/api";


const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    genre: "",
    rating: "",
    year: "",
    language: "",
    search: "",
    sortBy: "title",
    order: "asc",
    page: 1,
    limit: 50,
    quality: "",
    mpaRating: "",
  });
  const [pagination, setPagination] = useState({});

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await getMovies({})
      setMovies(res.data);
      setPagination(res.pagination);
    } catch (err) {
      console.error("Error fetching movies:", err);
      alert("Something went wrong while fetching movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [filters]);

  const debouncedSearch = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "search") {
      debouncedSearch(name, value);
    } else {
      setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
    }
  };

  const handleSort = (sortBy) => {
    setFilters((prev) => ({
      ...prev,
      sortBy,
      order: prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const handlePageChange = (direction:any) => {
    setFilters((prev) => ({
      ...prev,
      page: direction === "next" ? prev.page + 1 : Math.max(prev.page - 1, 1),
    }));
  };

  const resetFilters = () => {
    setFilters({
      genre: "",
      rating: "",
      year: "",
      language: "",
      search: "",
      sortBy: "title",
      order: "asc",
      page: 1,
      limit: 25,
      quality: "",
      mpaRating: "",
    });
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          name="search"
          placeholder="Search Movies"
          value={filters.search}
          onChange={handleInputChange}
          className="border p-2"
        />
        <select
          name="genre"
          value={filters.genre}
          onChange={handleInputChange}
          className="border p-2"
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
        </select>
        <input
          type="number"
          name="rating"
          placeholder="Minimum Rating"
          value={filters.rating}
          onChange={handleInputChange}
          className="border p-2"
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={filters.year}
          onChange={handleInputChange}
          className="border p-2"
        />
        <select
          name="language"
          value={filters.language}
          onChange={handleInputChange}
          className="border p-2"
        >
          <option value="">All Languages</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Spanish">Spanish</option>
        </select>
        <select
          name="quality"
          value={filters.quality}
          onChange={handleInputChange}
          className="border p-2"
        >
          <option value="">Quality</option>
          <option value="720p">&lt; 720p</option>
          <option value="1080p">1080p</option>
        </select>
        <input
          type="number"
          name="mpaRating"
          placeholder="mpaRating"
          value={filters.mpaRating}
          onChange={handleInputChange}
          className="border p-2"
        />
      </div>

      <div className="mb-4">
        <button onClick={() => handleSort("title")} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">
          Sort by Title ({filters.order})
        </button>
        <button onClick={() => handleSort("year")} className="px-4 py-2 bg-green-500 text-white rounded">
          Sort by Year ({filters.order})
        </button>
        <button onClick={resetFilters} className="ml-2 px-4 py-2 bg-red-500 text-white rounded">
          Reset Filters
        </button>
      </div>

      {loading ? (
        <p>Loading movies...</p>
      ) : movies.length === 0 ? (
        <p>No movies found matching the criteria.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movies.map((movie) => (
                  <MovieCard movie={movie}/>
                ))}
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={filters.page <= 1}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <span>
          Page {pagination.page} of {pagination.pages}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={pagination.page >= pagination.pages}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;

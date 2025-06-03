import MovieCard from "./MovieCard";
import { useMovieFilters } from "../hooks";
import { GENRE_OPTIONS, LANGUAGE_OPTIONS, QUALITY_OPTIONS, SORT_BUTTONS } from "../utils";

const MovieList = () => {
const { movies, filters, pagination,loading, handleInputChange,
    handleSort,
    handlePageChange,
    resetFilters,
} = useMovieFilters();

  const renderInput = (name: string, placeholder: string, type = 'text') => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={filters[name as keyof typeof filters]}
      onChange={handleInputChange}
      className="border p-2"
    />
  );

  const renderSelect = (name: string, options: Array<{value: string, label: string}>) => (
    <select
      name={name}
      value={filters[name as keyof typeof filters]}
      onChange={handleInputChange}
      className="border p-2"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
const renderSortButton = ({ key, label, color }: {key: string, label: string, color: string}) => (
    <button
     key={key}
      onClick={() => handleSort(key)}
      // className={`mr-2 px-4 py-2 bg-${color}-500 text-white rounded`}
      className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Sort by {label} ({filters.order})
    </button>
  );


  return (
    <div className="p-4 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {renderInput('search', 'Search Movies')}
        {renderSelect('genre', GENRE_OPTIONS)}
        {renderInput('rating', 'Rating', 'number')}
        {renderInput('mpaRating', 'MPA Rating')}
        {renderInput('year', 'Year', 'number')}
        {renderSelect('language', LANGUAGE_OPTIONS)}
        {renderSelect('quality', QUALITY_OPTIONS)}
      </div>

      <div className="mb-4">
        {SORT_BUTTONS.map(renderSortButton)}
        <button
          onClick={resetFilters}
          className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
        >
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
            <MovieCard movie={movie} />
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

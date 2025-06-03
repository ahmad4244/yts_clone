
import MovieList from "../components/MovieList";
export default function Main() {
  return (
    <div className="main-container p-4">
      <h1 className="text-3xl font-bold mb-4">YTS Movie Clone</h1>
      <div className="mb-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MovieList />
      </div>
    </div>
  );
}

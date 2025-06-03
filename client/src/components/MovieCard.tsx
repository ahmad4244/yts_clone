// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MovieCard(props: any) {
  const { movie } = props;
  console.log("Rendering MovieCard for:", movie);
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img
        src={movie.background_image}
        alt={movie.title}
        className="w-full h-60 object-cover mb-2 rounded"
      />
      <h2 className="font-bold text-lg">{movie.title}</h2>
      <p>
        {movie.year} | {movie.rating}★
      </p>
      <p className="text-sm text-gray-600">{movie.genres?.join(", ")}</p>
    </div>
  );
}

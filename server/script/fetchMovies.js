import axios from "axios";
import mongoose from "mongoose";
import Movie from "../models/movieSchema.model.js";

const BASE_URL = "https://yts.mx/api/v2/list_movies.json";
const LIMIT = 50;

async function fetchMovies(page = 1) {
  try {
    const res = await axios.get(BASE_URL, {
      params: { limit: LIMIT, page },
    });

    const movies = res.data.data.movies;
    if (!movies || movies.length === 0) return false;

    const newMovies = await Movie.insertMany(movies, { ordered: false });
    console.log(`Page ${page} ingested with ${newMovies.length} movies`);

    return movies.length === LIMIT;
  } catch (err) {
    if (err.code === 11000) {
      console.warn(`Duplicate movie skipped on page ${page}`);
    } else {
      console.error(`Error on page ${page}:`, err.message);
    }
    return false;
  }
}

async function getLastIngestedPage() {
  const latestMovie = await Movie.findOne().sort({ id: -1 }).limit(1);
  if (!latestMovie) return 1;

  return Math.floor(latestMovie.id / LIMIT) + 1;
}

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ytsDB");

  let page = await getLastIngestedPage();
  console.log(` Starting from page ${page}...`);

  let hasMore = true;
  while (hasMore) {
    hasMore = await fetchMovies(page);
    if (hasMore) page++;
  }

  await mongoose.disconnect();
  console.log("Finished ingestion");
}

main();

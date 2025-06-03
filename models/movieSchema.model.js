import mongoose, { version } from "mongoose";

const torrentSchema = new mongoose.Schema(
  {
    url: String,
    hash: String,
    quality: String,
    type: String,
    is_repack: String,
    video_codec: String,
    bit_depth: String,
    audio_channels: String,
    seeds: Number,
    peers: Number,
    size: String,
    size_bytes: Number,
    date_uploaded: String,
    date_uploaded_unix: Number,
  },
  { _id: false }
);

const movieSchema = new mongoose.Schema(
  {
    id: Number,
    url: String,
    imdb_code: String,
    title: String,
    title_english: String,
    title_long: String,
    slug: String,
    year: Number,
    rating: Number,
    runtime: Number,
    genres: [String],
    summary: String,
    description_full: String,
    synopsis: String,
    yt_trailer_code: String,
    language: String,
    mpa_rating: String,
    background_image: String,
    background_image_original: String,
    small_cover_image: String,
    medium_cover_image: String,
    large_cover_image: String,
    state: String,
    torrents: [torrentSchema],
    date_uploaded: String,
    date_uploaded_unix: Number,
  },
  { versionKey: false },
  { timestamps: true }
);

const Movies = mongoose.model("Movie", movieSchema);
export default Movies;

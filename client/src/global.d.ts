
interface MovieFilters {
  genre: string;
  rating: string;
  year: string;
  language: string;
  search: string;
  sortBy: string;
  order: string;
  page: number;
  limit: number;
  quality: string;
  mpaRating: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

 interface ApiResponse<T> {
  success: boolean;
  data: T[];
  pagination: PaginationMeta;
}

 interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

 interface Movie {
  _id: string;
  id: number;
  url: string;
  imdbCode: string;
  title: string;
  titleEnglish: string;
  titleLong: string;
  slug: string;
  year: number;
  rating: number;
  runtime: number;
  genres: string[];
  summary: string;
  descriptionFull: string;
  synopsis: string;
  ytTrailerCode: string;
  language: string;
  mpaRating: string;
  backgroundImage: string;
  backgroundImageOriginal: string;
  smallCoverImage: string;
  mediumCoverImage: string;
  largeCoverImage: string;
  state: string;
  torrents: Torrent[];
  dateUploaded: string;
  dateUploadedUnix: number;
}

 interface Torrent {
  url: string;
  hash: string;
  quality: string;
  type: string;
  isRepack: "0" | "1";
  videoCodec: string;
  bitDepth: string;
  audioChannels: string;
  seeds: number;
  peers: number;
  size: string;
  sizeBytes: number;
  dateUploaded: string;
  dateUploadedUnix: number;
}

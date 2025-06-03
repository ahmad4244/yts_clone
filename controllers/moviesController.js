import Movies from "../models/movieSchema.model.js";

export const getMovies = async (req, res) => {
  try {
    const {
      genre,
      rating,
      year,
      language,
      search,
      quality,
      mpaRating,
      page = "1",
      limit = "25",
      sortBy = "title",
      order = "asc",
    } = req.query;

    const query = {};

    if (genre) {
      const genreList = genre.split(",").map((g) => g.trim());
      query.genres = { $in: genreList };
    }

    const parsedRating = Number(rating);
    if (!isNaN(parsedRating)) {
      query.rating = { $gte: parsedRating };
    }

    const parsedYear = Number(year);
    if (!isNaN(parsedYear)) {
      query.year = parsedYear;
    }

    if (language) {
      query.language = language;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (quality) {
      query["torrents.quality"] = quality;
    }

    if (mpaRating) {
      query.mpa_rating = mpaRating;
    }

    const parsedPage = Math.max(1, parseInt(page, 10) || 1);
    const parsedLimit = Math.min(100, parseInt(limit, 10) || 25);
    const skip = (parsedPage - 1) * parsedLimit;
    const sortOrder = order === "desc" ? -1 : 1;
    const sort = { [sortBy]: sortOrder };

    const [total, movies] = await Promise.all([
      Movies.countDocuments(query),
      Movies.find(query).sort(sort).skip(skip).limit(parsedLimit),
    ]);

    return res.status(200).json({
      success: true,
      data: movies,
      pagination: {
        total,
        page: parsedPage,
        limit: parsedLimit,
        pages: Math.ceil(total / parsedLimit),
      },
    });
  } catch (err) {
    console.error("Error fetching movies:", {
      message: err.message,
      stack: err.stack,
    });

    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching movies. Please try again.",
    });
  }
};

export const searchMovies = async (req, res) => {
  try {
    const { movieSearch, page = 1, limit = 25 } = req.query;
    if (!movieSearch || movieSearch.trim() === "") {
      return res.status(400).json({ success: false, message: "Query is required." });
    }

    const query = {
      title: { $regex: movieSearch.trim(), $options: "i" }
    };

    const skip = (page - 1) * limit;
    const total = await Movies.countDocuments(query);
    const movies = await Movies.find(query)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      data: movies,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ success: false, message: "Server error during search." });
  }
};


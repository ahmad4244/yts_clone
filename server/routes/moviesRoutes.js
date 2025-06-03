import express from "express";
import { getMovies, searchMovies } from "../controllers/moviesController.js";

const router = express.Router();

router.get("/movies", getMovies);
router.get("/search", searchMovies);

export default router;

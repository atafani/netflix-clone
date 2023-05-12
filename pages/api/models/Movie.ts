import { ePlanType } from "enums";
import { Schema, model, models } from "mongoose";

interface IMovie {
  title?: string;
  year?: string;
  genre?: string;
  director?: string;
  writers?: boolean;
  plot?: string;
  language?: string;
  country?: string;
  poster?: string;
  imdbRating?: string;
  imdbID?: string;
  type?: string;
}
const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imdbID: {
    type: String,
    required: false,
  },
  year: {
    type: String,
    required: false,
  },
  genre: {
    type: String,
    required: false,
  },
  director: {
    type: String,
    required: false,
  },
  writers: {
    type: String,
    required: false,
  },
  plot: {
    type: String,
    required: false,
  },
  language: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  poster: {
    type: String,
    required: false,
  },
  ratings: {
    type: String,
    required: false,
  },
  imdbRating: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
});

const Movie = models.Movie || model("Movie", movieSchema);
export default Movie;
export type { IMovie };

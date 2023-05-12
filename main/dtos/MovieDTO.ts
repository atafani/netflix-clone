import { ePlanType } from "enums";

export type MovieDTO = {
  _id?: number;
  title: string;
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
};

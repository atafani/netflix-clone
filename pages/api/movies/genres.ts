import axios from "axios";
import { MovieDTO, ResponseDTO, UserDTO } from "dtos";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession, useSession } from "next-auth/react";
import { connectToDatabase } from "../libs";
import { IMovie } from "../models";
const imdb = require("imdb-api");

const { Movie } = require("../models");
const apiKey = "9445686";
const cli = new imdb.Client({ apiKey });
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseDTO<string[]>>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end("Method Not Allowed");
  }
  await connectToDatabase();
  try {
    const session = await getSession({ req });
    if (session?.user) {
      const data: MovieDTO[] = await Movie.find();
      const genres = data.reduce((genres: string[], movie: MovieDTO) => {
        const gen: string[] | undefined = movie.genre
          ?.split(",")
          .map((s: string) => s.trim());
        return [...genres, ...(gen ? gen : [])];
      }, []);
      res.status(200).send({
        data: Array.from(new Set(genres)).sort(),
      });
    } else {
      res
        .status(401)
        .send({ error: new Error("Unauthorized"), message: "Unauthorized" });
    }
  } catch (error: any) {
    res.status(400).send({ error, message: "Something went wrong!" });
  }
}

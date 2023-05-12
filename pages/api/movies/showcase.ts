import { ResponseDTO } from "dtos";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "../libs";
const { Movie } = require("../models");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseDTO<any>>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    await connectToDatabase();
    const session = await getSession({ req });
    if (session?.user) {
      const count = await Movie.countDocuments();
      const random = Math.floor(Math.random() * count);
      const data = await Movie.findOne().skip(random);
      res.status(200).send({ data });
    } else {
      res
        .status(401)
        .send({ error: new Error("Unauthorized"), message: "Unauthorized" });
    }
  } catch (error: any) {
    res.status(400).send({ error, message: "Something went wrong!" });
  }
}

import { ResponseDTO, UserDTO } from "dtos";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "./libs";
const { User } = require("./models");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseDTO>
) {
  const { email } = req.body;
  console.log("email", email);
  try {
    await connectToDatabase();
    User.create({ email }).then((data: UserDTO) => {
      console.log(data);
      res.status(201).send({ data });
    });
  } catch (error: any) {
    console.log("error", error);
    res.status(400).send({ error, message: "Something went wrong!" });
  }
}

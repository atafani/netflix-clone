import { ResponseDTO, UserDTO } from "dtos";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "./../libs";
const { User } = require("../models");
type HandlerFunction = (userId?: string, data?: UserDTO) => Promise<any>;

async function getUserHandler(userId?: string) {
  await connectToDatabase();
  const user = await User.findById(userId).select("-password -salt");
  return user;
}

async function updateUserHandler(userId?: string, data?: UserDTO) {
  await connectToDatabase();
  const user = await User.findByIdAndUpdate(userId, data, { new: true }).select(
    "-password -salt"
  );
  return user;
}

const handlers: Record<string, HandlerFunction> = {
  GET: getUserHandler,
  PUT: updateUserHandler,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseDTO<UserDTO>>
) {
  const handlerFunction = req.method && handlers[req.method];

  if (!handlerFunction) {
    res.setHeader("Allow", Object.keys(handlers).join(", "));
    return res.status(405).end("Method Not Allowed");
  }

  const { userId } = req.query;
  try {
    const result = await handlerFunction(userId?.toString(), req.body);
    return result
      ? res.status(200).send({ data: result })
      : res.status(404).send({ error: new Error("Resource not found") });
  } catch (error: any) {
    res.status(400).send({ error, message: "Something went wrong!" });
  }
}

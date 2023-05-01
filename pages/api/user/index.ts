import { ResponseDTO, UserDTO } from "dtos";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession, useSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseDTO<UserDTO>>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const session = await getSession({ req });
    if (session?.user) {
      res.status(200).send({ data: session.user as UserDTO });
    } else {
      res
        .status(401)
        .send({ error: new Error("Unauthorized"), message: "Unauthorized" });
    }
  } catch (error: any) {
    res.status(400).send({ error, message: "Something went wrong!" });
  }
}

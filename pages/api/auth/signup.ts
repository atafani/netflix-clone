import { ResponseDTO, UserDTO } from "dtos";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../libs";
import bcrypt from "bcrypt";
import { IUser, User } from "../models";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDTO>
) => {
  try {
    if (req.method === "POST") {
      if (!req.body)
        return res.status(404).json({ message: "No payload provided." });
      const { email, password: pass } = req.body;
      let password, salt;
      if (pass) {
        salt = await bcrypt.genSalt();
        password = await bcrypt.hash(pass, salt);
      }
      await connectToDatabase();
      const existingUserDoc = await User.findOneAndUpdate(
        { email },
        { password, salt },
        { new: true }
      );

      if (existingUserDoc)
        return res.status(409).json({
          data: {
            ...existingUserDoc._doc,
            password: null,
            registered: !!existingUserDoc._doc.password,
          },
          message: "User alreasy exists.",
        });

      const user = await User.create({ email });

      res.status(201).json({
        data: {
          ...user._doc,
          password: null,
          registered: !!user.password,
        },
        message: "Account created succesfully.",
      });
    } else {
      res
        .status(500)
        .json({ message: "HTTP method not valid. Only POST allowed." });
    }
  } catch (error: any) {
    res.status(403).json({ error, message: "Something went wrong." });
  }
};

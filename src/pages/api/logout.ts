import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { USER_TOKEN_KEY } from "@/lib/constants";
import { generateToken } from "@/lib/generateToken";
import { setServerCookie } from "@/lib/setServerCookie";
import * as jose from "jose";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "HEAD") {
    return res
      .status(405)
      .json({ message: `${req.method} http method not supported` });
  }

  try {
    const result = await prisma.user.findFirstOrThrow({
      where: { phone: req.body.phone },
    });

    const token = await generateToken(req.body.phone);
    setServerCookie(req, res, USER_TOKEN_KEY, token);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).send({
      message: "Unable to validate Phone number!",
    });
  }
}

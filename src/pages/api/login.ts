import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { USER_TOKEN_KEY } from "@/lib/constants";
import { generateToken } from "@/lib/generateToken";
import { setServerCookie } from "@/lib/setServerCookie";
import nextConnect from "next-connect";
import { onError, onNoMatch } from "@/utils/errorHandler";

// Required fields in body: name, phone
export default nextConnect<NextApiRequest, NextApiResponse>({
  onError: onError,
  onNoMatch: onNoMatch,
}).post(async (req, res) => {
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
});

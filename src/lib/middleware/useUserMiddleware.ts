import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyAuth } from "../auth";
import { USER_TOKEN_KEY } from "../constants";
import { prisma } from "../prisma";

export const useUserMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  try {
    let token = getCookie(USER_TOKEN_KEY, { req, res });
    const { userId } = await verifyAuth(token as string);

    const user = await prisma.user.findFirstOrThrow({
      where: { phone: userId as string },
    });
    //@ts-ignores
    req["user"] = user;
    next();
  } catch (error) {
    throw error;
  }
};

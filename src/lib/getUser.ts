import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getUserId } from "./getUserId";
import { prisma } from "./prisma";

export const getUser = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<User> => {
  const userId = await getUserId(req, res);
  const user = await prisma.user.findFirstOrThrow({
    where: { phone: userId as string },
  });
  return user;
};

import { useUserMiddleware } from "@/lib/middleware/useUserMiddleware";
import { prisma } from "@/lib/prisma";
import { onError, onNoMatch } from "@/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

export default nextConnect<NextApiRequest, NextApiResponse>({
  onError: onError,
  onNoMatch: onNoMatch,
})
  .use(useUserMiddleware)
  .get(async (req, res) => {
    // @ts-ignore
    const user = req.user;
    try {
      const cattles = await prisma.cattle.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
      return res.status(200).send(cattles);
    } catch (error) {
      throw error;
    }
  });

import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { useUserMiddleware } from "@/lib/middleware/useUserMiddleware";
import { onError, onNoMatch } from "@/utils/errorHandler";

export default nextConnect<NextApiRequest, NextApiResponse>({
  onError: (error, req, res, next) => {
    if (error.code === "ERR_JWS_INVALID") {
      return res.status(401).json({ message: "User not logged in" });
    }
    onError(error, req, res, next);
  },
  onNoMatch: onNoMatch,
})
  .use(useUserMiddleware)
  .get(async (req, res) => {
    // @ts-ignore
    res.status(200).send(req.user);
  });

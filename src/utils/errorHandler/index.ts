import logger from "@/helpers/logger";
import { NextApiRequest, NextApiResponse } from "next";

export const onError = (
  err: any,
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  logger.error({ error: err });
  res.status(500).json({ message: err.message || "Something broke!" });
};

export const onNoMatch = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
};

import { getCattles } from "@/lib/getCattles";
import { onError, onNoMatch } from "@/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

export default nextConnect<NextApiRequest, NextApiResponse>({
  onError: onError,
  onNoMatch: onNoMatch,
}).get(async (req, res) => {
  const { page } = req.query;

  try {
    const cattles = await getCattles(Number(page));
    res.status(200).send(cattles);
  } catch (error) {
    throw error;
  }
});

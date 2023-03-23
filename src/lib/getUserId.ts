import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyAuth } from "./auth";
import { USER_TOKEN_KEY } from "./constants";

export const getUserId = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<string> => {
  let jwtToken = getCookie(USER_TOKEN_KEY, { req, res });
  if (!jwtToken) {
    throw new Error("Session Expired");
  }
  const user = await verifyAuth(jwtToken as string);
  return user.userId as string;
};

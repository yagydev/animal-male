import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

export const setServerCookie = (
  req: NextApiRequest,
  res: NextApiResponse,
  key: string,
  value: string
) => {
  setCookie(key, value, {
    req,
    res,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
};

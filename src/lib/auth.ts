import { jwtVerify } from "jose";
import { NextRequest } from "next/server";
import { getJwtSecretKey, USER_TOKEN_KEY } from "./constants";

export const verifyAuth = async (token: string) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return payload;
  } catch (error) {
    throw error;
  }
};

export const isAuthenticated = async (request: NextRequest) => {
  let jwtToken = request.cookies.get(USER_TOKEN_KEY)?.value;
  return jwtToken && (await verifyAuth(jwtToken));
};

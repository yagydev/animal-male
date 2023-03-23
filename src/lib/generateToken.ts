import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "./constants";

export const generateToken = async (userId: string) => {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .sign(new TextEncoder().encode(getJwtSecretKey()));
};

// TODO: Move constants
export const USER_TOKEN_KEY = "user-token";
const JWT_SECRET_KEY = "JWT_SECRET_KEY";

export const getJwtSecretKey = () => {
  if (process.env.NODE_ENV === "production" && process.env.JWT_SECRET_KEY) {
    return process.env.JWT_SECRET_KEY;
  } else if (process.env.NODE_ENV === "development") {
    return process.env.JWT_SECRET_KEY || JWT_SECRET_KEY;
  }
  throw new Error("The Environment variable JWT_SECRET_KEY not found");
};

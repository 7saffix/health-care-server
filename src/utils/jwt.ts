import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

export const generateToken = (
  payload: JwtPayload,
  secret: Secret,
  expiresIn: SignOptions
) => {
  const token = jwt.sign(payload, secret, expiresIn);

  return token;
};

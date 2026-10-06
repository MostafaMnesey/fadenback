import jwt from "jsonwebtoken";

const DEFAULT_ACCESS_SECRET = "faden_access_jwt_secret_2026";
const DEFAULT_REFRESH_SECRET = "faden_refresh_jwt_secret_2026";

export const tokenTypeEnum = {
  access: "access",
  refresh: "refresh",
};

export const generateToken = ({
  user,
  tokenType = "access",
}: {
  user: { id: string; email?: string; role?: any };
  tokenType?: string;
}) => {
  const normalizedType = tokenType?.toLowerCase();
  const secret =
    normalizedType === "access"
      ? process.env.JWT_SECRET_ACCESS_ADMIN || DEFAULT_ACCESS_SECRET
      : process.env.JWT_SECRET_REFRESH_ADMIN || DEFAULT_REFRESH_SECRET;

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: typeof user.role === "object" ? user.role?.name : user.role,
    },
    secret,
    {
      expiresIn: normalizedType === "access" ? "30d" : "365d",
    }
  );
};

export const verifyToken = ({
  token,
  tokenType = "access",
}: {
  token: string;
  tokenType?: string;
}) => {
  const normalizedType = tokenType?.toLowerCase();
  const secret =
    normalizedType === "access"
      ? process.env.JWT_SECRET_ACCESS_ADMIN || DEFAULT_ACCESS_SECRET
      : process.env.JWT_SECRET_REFRESH_ADMIN || DEFAULT_REFRESH_SECRET;

  return jwt.verify(token, secret);
};

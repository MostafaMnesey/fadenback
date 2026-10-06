import bcrypt from "bcryptjs";
import prisma from "../../../database/Connection.db.js";
import { generateToken } from "../../../Utils/Token/token.js";

export const login = async ({ email, password }: { email?: string; password?: string }) => {
  if (!email || !password) {
    const error: any = new Error("Email and password are required");
    error.status = 400;
    throw error;
  }

  const normalizedEmail = email.toLowerCase().trim();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    const error: any = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  const isValid = bcrypt.compareSync(password, user.passwordHash);
  if (!isValid) {
    const error: any = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  const token = generateToken({
    user: { id: user.id, email: user.email },
    tokenType: "access",
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
};

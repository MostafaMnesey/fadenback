import prisma from "../../../database/Connection.db.js";

export const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true },
  });

  if (!user) {
    const error: any = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return user;
};

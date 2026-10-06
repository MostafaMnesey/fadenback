import prisma from "../../../database/Connection.db.js";

export const getHomeFeatures = async () => {
  let homeFeatures = await prisma.homeFeatures.findUnique({
    where: { id: "singleton" },
  });

  if (!homeFeatures) {
    homeFeatures = await prisma.homeFeatures.create({
      data: {
        id: "singleton",
        gallery: [],
        projects: [],
        services: [],
        clients: [],
        equipment: [],
      },
    });
  }

  return homeFeatures;
};

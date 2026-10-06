import prisma from "../../../database/Connection.db.js";

export const getAllEquipment = async () => {
  return await prisma.equipment.findMany({
    orderBy: { createdAt: "asc" },
  });
};

export const getEquipmentMeta = async () => {
  let meta = await prisma.equipmentMeta.findUnique({
    where: { id: "singleton" },
  });
  if (!meta) {
    meta = await prisma.equipmentMeta.create({
      data: {
        id: "singleton",
        intro: {
          eyebrow: "Fleet & Logistics",
          subtitle: "Heavy Machinery & Modern Construction Equipment",
          description: "An extensive fleet maintained to highest international readiness benchmarks.",
        },
        heavy: {
          eyebrow: "Heavy Fleet",
          subtitle: "Excavators, Cranes, Loaders, and Earthmoving Equipment",
        },
      },
    });
  }
  return meta;
};

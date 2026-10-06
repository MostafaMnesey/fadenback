import { nanoid } from "nanoid";
import prisma from "../../../database/Connection.db.js";
import { deepMerge } from "../../../Utils/Helpers.js";

export const createEquipment = async (data: {
  id?: string;
  name: string;
  count: number;
  image: string;
  rotate?: boolean;
}) => {
  if (!data.name || data.count === undefined || !data.image) {
    const error: any = new Error("name, count, and image are required");
    error.status = 400;
    throw error;
  }

  return await prisma.equipment.create({
    data: {
      id: data.id || `eq_${nanoid(8)}`,
      name: data.name,
      count: Number(data.count),
      image: data.image,
      rotate: Boolean(data.rotate),
    },
  });
};

export const updateEquipment = async ({
  id,
  name,
  count,
  image,
  rotate,
}: {
  id: string;
  name?: string;
  count?: number;
  image?: string;
  rotate?: boolean;
}) => {
  const existing = await prisma.equipment.findUnique({ where: { id } });
  if (!existing) {
    const error: any = new Error("Equipment not found");
    error.status = 404;
    throw error;
  }

  return await prisma.equipment.update({
    where: { id },
    data: {
      ...(name !== undefined && { name }),
      ...(count !== undefined && { count: Number(count) }),
      ...(image !== undefined && { image }),
      ...(rotate !== undefined && { rotate: Boolean(rotate) }),
    },
  });
};

export const deleteEquipment = async ({ id }: { id: string }) => {
  const existing = await prisma.equipment.findUnique({ where: { id } });
  if (!existing) {
    const error: any = new Error("Equipment not found");
    error.status = 404;
    throw error;
  }

  return await prisma.equipment.delete({ where: { id } });
};

export const updateEquipmentMeta = async (body: any) => {
  const existing = await prisma.equipmentMeta.findUnique({
    where: { id: "singleton" },
  });
  const mergedData = deepMerge(existing || { id: "singleton" }, body);

  return await prisma.equipmentMeta.upsert({
    where: { id: "singleton" },
    update: {
      intro: mergedData.intro,
      heavy: mergedData.heavy,
    },
    create: {
      id: "singleton",
      intro: mergedData.intro || {},
      heavy: mergedData.heavy || {},
    },
  });
};

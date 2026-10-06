import { nanoid } from "nanoid";
import prisma from "../../../database/Connection.db.js";
import { deepMerge } from "../../../Utils/Helpers.js";

export const createClient = async (data: {
  id?: string;
  name: string;
  logo: string;
}) => {
  if (!data.name || !data.logo) {
    const error: any = new Error("name and logo are required");
    error.status = 400;
    throw error;
  }

  return await prisma.client.create({
    data: {
      id: data.id || `cli_${nanoid(8)}`,
      name: data.name,
      logo: data.logo,
    },
  });
};

export const updateClient = async ({
  id,
  name,
  logo,
}: {
  id: string;
  name?: string;
  logo?: string;
}) => {
  const existing = await prisma.client.findUnique({ where: { id } });
  if (!existing) {
    const error: any = new Error("Client not found");
    error.status = 404;
    throw error;
  }

  return await prisma.client.update({
    where: { id },
    data: {
      ...(name !== undefined && { name }),
      ...(logo !== undefined && { logo }),
    },
  });
};

export const deleteClient = async ({ id }: { id: string }) => {
  const existing = await prisma.client.findUnique({ where: { id } });
  if (!existing) {
    const error: any = new Error("Client not found");
    error.status = 404;
    throw error;
  }

  return await prisma.client.delete({ where: { id } });
};

export const updateClientsMeta = async (body: any) => {
  const existing = await prisma.clientsMeta.findUnique({
    where: { id: "singleton" },
  });
  const mergedData = deepMerge(existing || { id: "singleton" }, body);

  return await prisma.clientsMeta.upsert({
    where: { id: "singleton" },
    update: {
      banner: mergedData.banner,
      intro: mergedData.intro,
      cta: mergedData.cta,
    },
    create: {
      id: "singleton",
      banner: mergedData.banner || {},
      intro: mergedData.intro || {},
      cta: mergedData.cta || {},
    },
  });
};

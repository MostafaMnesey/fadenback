import { nanoid } from "nanoid";
import prisma from "../../../database/Connection.db.js";
import { deepMerge } from "../../../Utils/Helpers.js";

export const createGallery = async (data: {
  id?: string;
  src: string;
  alt: string;
  position?: string;
}) => {
  if (!data.src || !data.alt) {
    const error: any = new Error("src and alt are required");
    error.status = 400;
    throw error;
  }

  return await prisma.galleryImage.create({
    data: {
      id: data.id || `gal_${nanoid(8)}`,
      src: data.src,
      alt: data.alt,
      position: data.position || null,
    },
  });
};

export const updateGallery = async ({
  id,
  src,
  alt,
  position,
}: {
  id: string;
  src?: string;
  alt?: string;
  position?: string;
}) => {
  const existing = await prisma.galleryImage.findUnique({ where: { id } });
  if (!existing) {
    const error: any = new Error("Gallery image not found");
    error.status = 404;
    throw error;
  }

  return await prisma.galleryImage.update({
    where: { id },
    data: {
      ...(src !== undefined && { src }),
      ...(alt !== undefined && { alt }),
      ...(position !== undefined && { position }),
    },
  });
};

export const deleteGallery = async ({ id }: { id: string }) => {
  const existing = await prisma.galleryImage.findUnique({ where: { id } });
  if (!existing) {
    const error: any = new Error("Gallery image not found");
    error.status = 404;
    throw error;
  }

  return await prisma.galleryImage.delete({ where: { id } });
};

export const updateGalleryMeta = async (body: any) => {
  const existing = await prisma.galleryMeta.findUnique({
    where: { id: "singleton" },
  });
  const mergedData = deepMerge(existing || { id: "singleton", itemsPerPage: 12 }, body);

  return await prisma.galleryMeta.upsert({
    where: { id: "singleton" },
    update: {
      intro: mergedData.intro,
      itemsPerPage: mergedData.itemsPerPage !== undefined ? Number(mergedData.itemsPerPage) : 12,
    },
    create: {
      id: "singleton",
      intro: mergedData.intro || {},
      itemsPerPage: mergedData.itemsPerPage !== undefined ? Number(mergedData.itemsPerPage) : 12,
    },
  });
};

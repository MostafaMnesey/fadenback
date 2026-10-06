import prisma from "../../../database/Connection.db.js";

export const getAllGallery = async () => {
  return await prisma.galleryImage.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      src: true,
      alt: true,
      position: true,
    },
  });
};

export const getGalleryMeta = async () => {
  let meta = await prisma.galleryMeta.findUnique({
    where: { id: "singleton" },
  });
  if (!meta) {
    meta = await prisma.galleryMeta.create({
      data: {
        id: "singleton",
        intro: {
          eyebrow: "Visual Showcase",
          subtitle: "A glimpse into our landmark projects and heavy machinery fleet.",
        },
        itemsPerPage: 12,
      },
    });
  }
  return meta;
};

import prisma from "../../../database/Connection.db.js";

export const getAllServices = async () => {
  return await prisma.service.findMany({
    orderBy: { order: "asc" },
  });
};

export const getServiceBySlug = async (slug: string) => {
  const service = await prisma.service.findUnique({
    where: { slug },
  });

  if (!service) {
    const error: any = new Error("Service not found");
    error.status = 404;
    throw error;
  }

  let whyChooseDoc: any = null;
  let sections = (service.sections as any[]) || [];

  const hasSharedWhyChoose = sections.some(
    (sec) => sec.type === "SHARED_WHY_CHOOSE" || sec.id === "why-choose"
  );

  if (hasSharedWhyChoose) {
    whyChooseDoc = await prisma.whyChooseFaden.findUnique({
      where: { id: "why-choose" },
    });
    if (!whyChooseDoc) {
      whyChooseDoc = {
        id: "why-choose",
        type: "BULLETS",
        title: "Why Choose FADEN",
        subtitle: "Delivering Excellence",
        content: { items: [] },
      };
    }

    sections = sections.map((sec) => {
      if (sec.type === "SHARED_WHY_CHOOSE" || sec.id === "why-choose") {
        return {
          ...whyChooseDoc,
          order: sec.order !== undefined ? sec.order : 2,
        };
      }
      return sec;
    });
  }

  return {
    ...service,
    sections,
  };
};

export const getWhyChooseFaden = async () => {
  let whyChoose = await prisma.whyChooseFaden.findUnique({
    where: { id: "why-choose" },
  });
  if (!whyChoose) {
    whyChoose = await prisma.whyChooseFaden.create({
      data: {
        id: "why-choose",
        type: "BULLETS",
        title: "Why Choose FADEN",
        subtitle: "Delivering Excellence Across Saudi Arabia & Beyond",
        content: { items: [] },
      },
    });
  }
  return whyChoose;
};

export const getServicesMeta = async () => {
  let meta = await prisma.servicesMeta.findUnique({
    where: { id: "singleton" },
  });
  if (!meta) {
    meta = await prisma.servicesMeta.create({
      data: {
        id: "singleton",
        banner: {
          title: "Comprehensive Contracting & Engineering Solutions",
          subtitle: "Delivering end-to-end capabilities tailored to complex challenges.",
        },
      },
    });
  }
  return meta;
};

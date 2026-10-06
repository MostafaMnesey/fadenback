import { nanoid } from "nanoid";
import prisma from "../../../database/Connection.db.js";
import { deepMerge } from "../../../Utils/Helpers.js";

export const createService = async (data: {
  id?: string;
  name: string;
  slug: string;
  description: string;
  img: string;
  order?: number;
  bannerImage?: string;
  bannerSubtitle?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaBackgroundImage?: string;
  sections?: any[];
  projects?: any[];
}) => {
  if (!data.name || !data.slug || !data.description || !data.img) {
    const error: any = new Error("name, slug, description, and img are required");
    error.status = 400;
    throw error;
  }

  const existingSlug = await prisma.service.findUnique({
    where: { slug: data.slug },
  });
  if (existingSlug) {
    const error: any = new Error("slug already in use");
    error.status = 409;
    throw error;
  }

  let calculatedOrder = data.order;
  if (calculatedOrder === undefined || calculatedOrder === null) {
    const count = await prisma.service.count();
    calculatedOrder = count + 1;
  }

  return await prisma.service.create({
    data: {
      id: data.id || `srv_${nanoid(8)}`,
      name: data.name,
      slug: data.slug,
      description: data.description,
      img: data.img,
      order: Number(calculatedOrder),
      bannerImage: data.bannerImage || null,
      bannerSubtitle: data.bannerSubtitle || null,
      ctaTitle: data.ctaTitle || null,
      ctaSubtitle: data.ctaSubtitle || null,
      ctaBackgroundImage: data.ctaBackgroundImage || null,
      sections: data.sections || [],
      projects: data.projects || [],
    },
  });
};

export const updateService = async ({
  id,
  name,
  slug,
  description,
  img,
  order,
  bannerImage,
  bannerSubtitle,
  ctaTitle,
  ctaSubtitle,
  ctaBackgroundImage,
}: {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
  img?: string;
  order?: number;
  bannerImage?: string;
  bannerSubtitle?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaBackgroundImage?: string;
}) => {
  const existing = await prisma.service.findUnique({ where: { id } });
  if (!existing) {
    const error: any = new Error("Service not found");
    error.status = 404;
    throw error;
  }

  if (slug && slug !== existing.slug) {
    const slugInUse = await prisma.service.findUnique({ where: { slug } });
    if (slugInUse) {
      const error: any = new Error("slug already in use");
      error.status = 409;
      throw error;
    }
  }

  return await prisma.service.update({
    where: { id },
    data: {
      ...(name !== undefined && { name }),
      ...(slug !== undefined && { slug }),
      ...(description !== undefined && { description }),
      ...(img !== undefined && { img }),
      ...(order !== undefined && { order: Number(order) }),
      ...(bannerImage !== undefined && { bannerImage }),
      ...(bannerSubtitle !== undefined && { bannerSubtitle }),
      ...(ctaTitle !== undefined && { ctaTitle }),
      ...(ctaSubtitle !== undefined && { ctaSubtitle }),
      ...(ctaBackgroundImage !== undefined && { ctaBackgroundImage }),
    },
  });
};

export const updateServiceSections = async ({
  slug,
  sections,
}: {
  slug: string;
  sections: any[];
}) => {
  const existing = await prisma.service.findUnique({ where: { slug } });
  if (!existing) {
    const error: any = new Error("Service not found");
    error.status = 404;
    throw error;
  }

  // Collapse SHARED_WHY_CHOOSE back to marker
  const collapsedSections = sections.map((sec: any) => {
    if (
      sec.type === "SHARED_WHY_CHOOSE" ||
      sec.id === "why-choose" ||
      sec.title === "Why Choose FADEN"
    ) {
      return {
        id: "why-choose",
        type: "SHARED_WHY_CHOOSE",
        order: sec.order !== undefined ? sec.order : 2,
      };
    }
    return sec;
  });

  return await prisma.service.update({
    where: { slug },
    data: {
      sections: collapsedSections,
    },
  });
};

export const updateServiceProjects = async ({
  slug,
  projects,
}: {
  slug: string;
  projects: any[];
}) => {
  const existing = await prisma.service.findUnique({ where: { slug } });
  if (!existing) {
    const error: any = new Error("Service not found");
    error.status = 404;
    throw error;
  }

  return await prisma.service.update({
    where: { slug },
    data: {
      projects,
    },
  });
};

export const deleteService = async ({ id }: { id: string }) => {
  const existing = await prisma.service.findUnique({ where: { id } });
  if (!existing) {
    const error: any = new Error("Service not found");
    error.status = 404;
    throw error;
  }

  return await prisma.service.delete({ where: { id } });
};

export const reorderServices = async ({
  orderedIds,
}: {
  orderedIds: string[];
}) => {
  if (!Array.isArray(orderedIds)) {
    const error: any = new Error("orderedIds array is required");
    error.status = 400;
    throw error;
  }

  for (let index = 0; index < orderedIds.length; index++) {
    const sid = orderedIds[index];
    await prisma.service.update({
      where: { id: sid },
      data: { order: index + 1 },
    });
  }

  return await prisma.service.findMany({
    orderBy: { order: "asc" },
  });
};

export const updateWhyChooseFaden = async (body: any) => {
  const existing = await prisma.whyChooseFaden.findUnique({
    where: { id: "why-choose" },
  });
  const mergedData = deepMerge(
    existing || {
      id: "why-choose",
      type: "BULLETS",
      title: "Why Choose FADEN",
      subtitle: "",
      content: { items: [] },
    },
    body
  );

  return await prisma.whyChooseFaden.upsert({
    where: { id: "why-choose" },
    update: {
      title: mergedData.title,
      subtitle: mergedData.subtitle,
      type: mergedData.type || "BULLETS",
      content: mergedData.content,
    },
    create: {
      id: "why-choose",
      title: mergedData.title || "Why Choose FADEN",
      subtitle: mergedData.subtitle || "",
      type: mergedData.type || "BULLETS",
      content: mergedData.content || { items: [] },
    },
  });
};

export const updateServicesMeta = async (body: any) => {
  const existing = await prisma.servicesMeta.findUnique({
    where: { id: "singleton" },
  });
  const mergedData = deepMerge(existing || { id: "singleton" }, body);

  return await prisma.servicesMeta.upsert({
    where: { id: "singleton" },
    update: {
      banner: mergedData.banner,
      sectors: mergedData.sectors,
      whyChoose: mergedData.whyChoose,
      cta: mergedData.cta,
    },
    create: {
      id: "singleton",
      banner: mergedData.banner || {},
      sectors: mergedData.sectors || {},
      whyChoose: mergedData.whyChoose || {},
      cta: mergedData.cta || {},
    },
  });
};

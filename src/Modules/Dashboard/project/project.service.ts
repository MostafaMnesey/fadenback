import { nanoid } from "nanoid";
import prisma from "../../../database/Connection.db.js";
import { deepMerge } from "../../../Utils/Helpers.js";

export const createProject = async (data: {
  id?: string;
  title: string;
  slug: string;
  img: string;
  status: string;
  partnershipType: string;
  order?: number;
  client: string;
  location: string;
  country: string;
  service: any;
  createdAt?: string | Date;
  detail?: any;
}) => {
  if (
    !data.title ||
    !data.slug ||
    !data.img ||
    !data.status ||
    !data.partnershipType ||
    !data.client ||
    !data.location ||
    !data.country ||
    !data.service
  ) {
    const error: any = new Error("Missing required project fields");
    error.status = 400;
    throw error;
  }

  const existingSlug = await prisma.project.findUnique({
    where: { slug: data.slug },
  });
  if (existingSlug) {
    const error: any = new Error("slug already in use");
    error.status = 409;
    throw error;
  }

  let calculatedOrder = data.order;
  if (calculatedOrder === undefined || calculatedOrder === null) {
    const count = await prisma.project.count();
    calculatedOrder = count + 1;
  }

  return await prisma.project.create({
    data: {
      id: data.id || `prj_${nanoid(8)}`,
      title: data.title,
      slug: data.slug,
      img: data.img,
      status: data.status,
      partnershipType: data.partnershipType,
      order: Number(calculatedOrder),
      client: data.client,
      location: data.location,
      country: data.country,
      service: data.service,
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      detail: data.detail || null,
    },
  });
};

export const updateProject = async ({
  id,
  title,
  slug,
  img,
  status,
  partnershipType,
  order,
  client,
  location,
  country,
  service,
  createdAt,
}: {
  id: string;
  title?: string;
  slug?: string;
  img?: string;
  status?: string;
  partnershipType?: string;
  order?: number;
  client?: string;
  location?: string;
  country?: string;
  service?: any;
  createdAt?: string | Date;
}) => {
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) {
    const error: any = new Error("Project not found");
    error.status = 404;
    throw error;
  }

  if (slug && slug !== existing.slug) {
    const slugInUse = await prisma.project.findUnique({ where: { slug } });
    if (slugInUse) {
      const error: any = new Error("slug already in use");
      error.status = 409;
      throw error;
    }
  }

  return await prisma.project.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(slug !== undefined && { slug }),
      ...(img !== undefined && { img }),
      ...(status !== undefined && { status }),
      ...(partnershipType !== undefined && { partnershipType }),
      ...(order !== undefined && { order: Number(order) }),
      ...(client !== undefined && { client }),
      ...(location !== undefined && { location }),
      ...(country !== undefined && { country }),
      ...(service !== undefined && { service }),
      ...(createdAt !== undefined && { createdAt: new Date(createdAt) }),
    },
  });
};

export const updateProjectDetail = async ({
  id,
  detail,
}: {
  id: string;
  detail: any;
}) => {
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) {
    const error: any = new Error("Project not found");
    error.status = 404;
    throw error;
  }

  return await prisma.project.update({
    where: { id },
    data: {
      detail,
    },
  });
};

export const deleteProject = async ({ id }: { id: string }) => {
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) {
    const error: any = new Error("Project not found");
    error.status = 404;
    throw error;
  }

  return await prisma.project.delete({ where: { id } });
};

export const reorderProjects = async ({
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
    const pid = orderedIds[index];
    await prisma.project.update({
      where: { id: pid },
      data: { order: index + 1 },
    });
  }

  return await prisma.project.findMany({
    orderBy: { order: "asc" },
  });
};

export const updateProjectsMeta = async (body: any) => {
  const existing = await prisma.projectsMeta.findUnique({
    where: { id: "singleton" },
  });
  const mergedData = deepMerge(existing || { id: "singleton" }, body);

  return await prisma.projectsMeta.upsert({
    where: { id: "singleton" },
    update: {
      banner: mergedData.banner,
    },
    create: {
      id: "singleton",
      banner: mergedData.banner || {},
    },
  });
};

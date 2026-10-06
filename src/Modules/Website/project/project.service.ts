import prisma from "../../../database/Connection.db.js";
import { defaultProjectDetail } from "../../../Utils/Helpers.js";

export const getAllProjects = async () => {
  return await prisma.project.findMany({
    orderBy: { order: "asc" },
  });
};

export const getProjectBySlug = async (slug: string) => {
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    const error: any = new Error("Project not found");
    error.status = 404;
    throw error;
  }

  const resolvedDetail = defaultProjectDetail(project);

  const serviceObj = project.service as any;
  const serviceId = serviceObj?.id;
  const serviceSlug = serviceObj?.slug;

  const allProjects = await prisma.project.findMany({
    where: {
      slug: { not: slug },
    },
    orderBy: { order: "asc" },
  });

  const relatedProjects = allProjects
    .filter((p) => {
      const pService = p.service as any;
      return (
        (serviceId && pService?.id === serviceId) ||
        (serviceSlug && pService?.slug === serviceSlug)
      );
    })
    .slice(0, 3);

  return {
    ...project,
    detail: resolvedDetail,
    relatedProjects,
  };
};

export const getProjectCategories = async () => {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
    select: { id: true, name: true, slug: true },
  });

  const projects = await prisma.project.findMany({
    select: { service: true },
  });

  return services.map((srv) => {
    const count = projects.filter((p) => {
      const s = p.service as any;
      return s?.id === srv.id || s?.slug === srv.slug;
    }).length;

    return {
      id: srv.id,
      name: srv.name,
      slug: srv.slug,
      _count: {
        projects: count,
      },
    };
  });
};

export const getProjectsMeta = async () => {
  let meta = await prisma.projectsMeta.findUnique({
    where: { id: "singleton" },
  });
  if (!meta) {
    meta = await prisma.projectsMeta.create({
      data: {
        id: "singleton",
        banner: {
          title: "Our Portfolio of Landmark Projects",
          subtitle: "Exemplary engineering and construction across Saudi Arabia and Egypt.",
        },
      },
    });
  }
  return meta;
};

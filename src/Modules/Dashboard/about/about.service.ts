import prisma from "../../../database/Connection.db.js";
import { deepMerge } from "../../../Utils/Helpers.js";

export const updateOverview = async (body: any) => {
  const existing = await prisma.aboutOverview.findUnique({
    where: { id: "singleton" },
  });
  const mergedData = deepMerge(existing || { id: "singleton" }, body);

  return await prisma.aboutOverview.upsert({
    where: { id: "singleton" },
    update: {
      banner: mergedData.banner,
      intro: mergedData.intro,
      stats: mergedData.stats,
    },
    create: {
      id: "singleton",
      banner: mergedData.banner || {},
      intro: mergedData.intro || {},
      stats: mergedData.stats || [],
    },
  });
};

export const updateVisionMission = async (body: any) => {
  const existing = await prisma.aboutVisionMission.findUnique({
    where: { id: "singleton" },
  });
  const mergedData = deepMerge(existing || { id: "singleton" }, body);

  return await prisma.aboutVisionMission.upsert({
    where: { id: "singleton" },
    update: {
      banner: mergedData.banner,
      drivers: mergedData.drivers,
      different: mergedData.different,
    },
    create: {
      id: "singleton",
      banner: mergedData.banner || {},
      drivers: mergedData.drivers || {},
      different: mergedData.different || {},
    },
  });
};

export const updateLeadership = async (body: any) => {
  const existing = await prisma.aboutLeadership.findUnique({
    where: { id: "singleton" },
  });
  const mergedData = deepMerge(existing || { id: "singleton" }, body);

  return await prisma.aboutLeadership.upsert({
    where: { id: "singleton" },
    update: {
      banner: mergedData.banner,
      messages: mergedData.messages,
      subsidiaries: mergedData.subsidiaries,
    },
    create: {
      id: "singleton",
      banner: mergedData.banner || {},
      messages: mergedData.messages || [],
      subsidiaries: mergedData.subsidiaries || {},
    },
  });
};

export const updatePartners = async (body: any) => {
  const existing = await prisma.aboutPartners.findUnique({
    where: { id: "singleton" },
  });
  const mergedData = deepMerge(existing || { id: "singleton" }, body);

  return await prisma.aboutPartners.upsert({
    where: { id: "singleton" },
    update: {
      banner: mergedData.banner,
      intro: mergedData.intro,
      achievements: mergedData.achievements,
      projects: mergedData.projects,
    },
    create: {
      id: "singleton",
      banner: mergedData.banner || {},
      intro: mergedData.intro || {},
      achievements: mergedData.achievements || {},
      projects: mergedData.projects || {},
    },
  });
};

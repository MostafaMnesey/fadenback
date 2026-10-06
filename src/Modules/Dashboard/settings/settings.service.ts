import prisma from "../../../database/Connection.db.js";
import { deepMerge } from "../../../Utils/Helpers.js";

export const updateSettings = async (body: any) => {
  const existing = await prisma.settings.findUnique({
    where: { id: "singleton" },
  });
  const mergedData = deepMerge(existing || { id: "singleton" }, body);

  return await prisma.settings.upsert({
    where: { id: "singleton" },
    update: {
      branding: mergedData.branding,
      navigation: mergedData.navigation,
      socialLinks: mergedData.socialLinks,
      footer: mergedData.footer,
      seo: mergedData.seo,
    },
    create: {
      id: "singleton",
      branding: mergedData.branding || {},
      navigation: mergedData.navigation || {},
      socialLinks: mergedData.socialLinks || [],
      footer: mergedData.footer || {},
      seo: mergedData.seo || {},
    },
  });
};

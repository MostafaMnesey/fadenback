import prisma from "../../../database/Connection.db.js";

const VALID_SECTIONS = ["gallery", "projects", "services", "clients", "equipment"];

export const updateHomeFeatureSection = async ({
  section,
  ids,
}: {
  section: string;
  ids: string[];
}) => {
  if (!VALID_SECTIONS.includes(section)) {
    const error: any = new Error(
      `Invalid section '${section}'. Must be one of: ${VALID_SECTIONS.join(", ")}`
    );
    error.status = 400;
    throw error;
  }

  if (!Array.isArray(ids)) {
    const error: any = new Error("ids array is required");
    error.status = 400;
    throw error;
  }

  return await prisma.homeFeatures.upsert({
    where: { id: "singleton" },
    update: {
      [section]: ids,
    },
    create: {
      id: "singleton",
      [section]: ids,
    },
  });
};

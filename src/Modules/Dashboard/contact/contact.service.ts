import prisma from "../../../database/Connection.db.js";
import { deepMerge } from "../../../Utils/Helpers.js";

export const getSubmissions = async () => {
  return await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const markSubmissionRead = async ({ id }: { id: string }) => {
  const existing = await prisma.contactSubmission.findUnique({ where: { id } });
  if (!existing) {
    const error: any = new Error("Submission not found");
    error.status = 404;
    throw error;
  }

  return await prisma.contactSubmission.update({
    where: { id },
    data: { read: true },
  });
};

export const deleteSubmission = async ({ id }: { id: string }) => {
  const existing = await prisma.contactSubmission.findUnique({ where: { id } });
  if (!existing) {
    const error: any = new Error("Submission not found");
    error.status = 404;
    throw error;
  }

  return await prisma.contactSubmission.delete({ where: { id } });
};

export const updateContactPage = async (body: any) => {
  const existing = await prisma.contactPage.findUnique({
    where: { id: "singleton" },
  });

  // Never persist info.items
  const sanitizedBody = { ...body };
  if (sanitizedBody.info && typeof sanitizedBody.info === "object") {
    const { items, ...infoRest } = sanitizedBody.info;
    sanitizedBody.info = infoRest;
  }

  const mergedData = deepMerge(existing || { id: "singleton" }, sanitizedBody);

  return await prisma.contactPage.upsert({
    where: { id: "singleton" },
    update: {
      banner: mergedData.banner,
      info: mergedData.info,
      form: mergedData.form,
      map: mergedData.map,
    },
    create: {
      id: "singleton",
      banner: mergedData.banner || {},
      info: mergedData.info || {},
      form: mergedData.form || {},
      map: mergedData.map || {},
    },
  });
};

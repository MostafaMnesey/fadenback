import prisma from "../../../database/Connection.db.js";

export const getAllClients = async () => {
  return await prisma.client.findMany({
    orderBy: { createdAt: "asc" },
  });
};

export const getClientsMeta = async () => {
  let meta = await prisma.clientsMeta.findUnique({
    where: { id: "singleton" },
  });
  if (!meta) {
    meta = await prisma.clientsMeta.create({
      data: {
        id: "singleton",
        banner: {
          title: "Trusted by Government & Industry Leaders",
          subtitle: "Building enduring partnerships through excellence and accountability.",
          image: "/images/faden/clients-banner.webp",
        },
        intro: {
          eyebrow: "Our Strategic Partners",
          title: "Clients Who Rely on FADEN",
          description: "From national ministries to global energy leaders, our clients trust us to deliver.",
        },
        cta: {
          title: "Become a Partner",
          subtitle: "Collaborate with a contractor dedicated to your success.",
          image: "/images/faden/cta-clients.webp",
          primaryButton: { label: "Get in Touch", href: "/contact" },
        },
      },
    });
  }
  return meta;
};

import prisma from "../../../database/Connection.db.js";

export const getSettings = async () => {
  let settings = await prisma.settings.findUnique({
    where: { id: "singleton" },
  });

  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        id: "singleton",
        branding: {},
        navigation: { items: [] },
        socialLinks: [],
        footer: {
          quickLinks: [],
          contact: {
            address: "King Abdulaziz Road, Riyadh, Kingdom of Saudi Arabia",
            phone: "+966 11 234 5678",
            email: "info@fadensa.com",
          },
          copyrightText: "© 2026 FADEN Contracting Co. All rights reserved.",
        },
        seo: {},
      },
    });
  }

  return settings;
};

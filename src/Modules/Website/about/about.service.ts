import prisma from "../../../database/Connection.db.js";

export const getOverview = async () => {
  let item = await prisma.aboutOverview.findUnique({
    where: { id: "singleton" },
  });
  if (!item) {
    item = await prisma.aboutOverview.create({
      data: {
        id: "singleton",
        banner: {
          title: "About FADEN Contracting",
          subtitle: "Building the foundations of progress across the Kingdom.",
          backgroundImage: "/images/faden/about-overview-banner.webp",
        },
        intro: {
          eyebrow: "Company Overview",
          lead: "A distinguished general contracting powerhouse committed to Vision 2030.",
          paragraphs: [],
          quote: "Engineering tomorrow with unwavering precision today.",
        },
        stats: [],
      },
    });
  }
  return item;
};

export const getVisionMission = async () => {
  let item = await prisma.aboutVisionMission.findUnique({
    where: { id: "singleton" },
  });
  if (!item) {
    item = await prisma.aboutVisionMission.create({
      data: {
        id: "singleton",
        banner: {
          title: "Vision & Mission",
          subtitle: "Guided by purposeful values and ambitious aspirations.",
          backgroundImage: "/images/faden/about-vision-banner.webp",
        },
        drivers: {
          eyebrow: "Core Drivers",
          subtitle: "Guiding Principles for Sustainable Growth",
          primary: [],
          secondary: [],
        },
        different: {
          eyebrow: "What Sets Us Apart",
          subtitle: "The FADEN Advantage",
          image: "/images/faden/about-different.webp",
          imageAlt: "FADEN Advantage",
          items: [],
        },
      },
    });
  }
  return item;
};

export const getLeadership = async () => {
  let item = await prisma.aboutLeadership.findUnique({
    where: { id: "singleton" },
  });
  if (!item) {
    item = await prisma.aboutLeadership.create({
      data: {
        id: "singleton",
        banner: {
          title: "Leadership Messages",
          subtitle: "Experienced executive stewardship directing our journey.",
          backgroundImage: "/images/faden/about-leadership-banner.webp",
        },
        messages: [],
        subsidiaries: {
          eyebrow: "Group Subsidiaries",
          subtitle: "Integrated services under one umbrella",
          logos: [],
        },
      },
    });
  }
  return item;
};

export const getPartners = async () => {
  let item = await prisma.aboutPartners.findUnique({
    where: { id: "singleton" },
  });
  if (!item) {
    item = await prisma.aboutPartners.create({
      data: {
        id: "singleton",
        banner: {
          title: "Strategic Partners",
          subtitle: "Collaborating with industry pioneers to deliver mega projects.",
          backgroundImage: "/images/faden/about-partners-banner.webp",
        },
        intro: {
          eyebrow: "Global Energy & Alliances",
          subtitle: "Stronger Together",
          logo: "/images/faden/partner-global-energy.webp",
          logoAlt: "Global Energy Logo",
          badge: "Strategic Alliance",
          title: "Partnership with Global Energy",
          description: "Joint venture collaboration expanding our capabilities.",
          bullets: [],
        },
        achievements: {
          eyebrow: "Joint Milestones",
          subtitle: "Key Highlights",
          items: [],
        },
        projects: {
          eyebrow: "Collaborative Projects",
          subtitle: "Delivered jointly with partners",
          items: [],
        },
      },
    });
  }
  return item;
};

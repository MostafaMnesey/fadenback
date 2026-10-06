import "dotenv/config";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://faden_user:faden_password@localhost:55433/faden_db?schema=public";
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Create or Upsert Admin User
  const passwordHash = bcrypt.hashSync("faden2026", 10);
  await prisma.user.upsert({
    where: { email: "admin@fadensa.com" },
    update: { passwordHash },
    create: {
      id: "usr_admin_1",
      email: "admin@fadensa.com",
      passwordHash,
    },
  });
  console.log("👤 Admin user seeded (admin@fadensa.com / faden2026)");

  // 2. Seed Why Choose FADEN Singleton
  await prisma.whyChooseFaden.upsert({
    where: { id: "why-choose" },
    update: {},
    create: {
      id: "why-choose",
      type: "BULLETS",
      title: "Why Choose FADEN",
      subtitle: "Delivering Excellence Across Saudi Arabia & Beyond",
      content: {
        items: [
          "Proven Track Record in mega civil and commercial projects.",
          "State-of-the-Art Fleet of heavy machinery and construction equipment.",
          "Strict Quality & Safety Compliance adhering to ISO and Vision 2030 standards.",
          "Turnkey Engineering & Contracting capabilities from ground to finish.",
          "Dedicated Team of experienced engineers, project managers, and technicians.",
        ],
      },
    },
  });

  // 3. Seed Services
  const generalContracting = await prisma.service.upsert({
    where: { slug: "general-contracting" },
    update: {},
    create: {
      id: "srv_general_contracting",
      name: "General Contracting",
      slug: "general-contracting",
      description:
        "Comprehensive turnkey construction and general contracting solutions for commercial, residential, and institutional developments.",
      img: "/images/faden/service-1.webp",
      order: 1,
      bannerImage: "/images/faden/service-banner-1.webp",
      bannerSubtitle: "Excellence in Construction",
      ctaTitle: "Ready to Build Your Vision?",
      ctaSubtitle: "Contact our team today to discuss your next construction project.",
      sections: [
        {
          id: "sec-1",
          type: "OVERVIEW",
          title: "Full-Cycle Construction Services",
          subtitle: "From ground-breaking to handover",
          content: {
            paragraphs: [
              "FADEN provides comprehensive general contracting services, managing all phases of construction with precision, safety, and highest quality craftsmanship.",
            ],
          },
          img: "/images/faden/service-overview-1.webp",
          order: 1,
        },
        {
          id: "why-choose",
          type: "SHARED_WHY_CHOOSE",
          order: 2,
        },
      ],
      projects: [
        {
          id: "kp-1",
          title: "Riyadh Financial Tower",
          subtitle: "Commercial Skyscraper",
          img: "/images/faden/project-1.webp",
        },
      ],
    },
  });

  const infrastructure = await prisma.service.upsert({
    where: { slug: "infrastructure-earthworks" },
    update: {},
    create: {
      id: "srv_infrastructure",
      name: "Infrastructure & Earthworks",
      slug: "infrastructure-earthworks",
      description:
        "Large-scale civil engineering, heavy excavation, site leveling, and transport infrastructure.",
      img: "/images/faden/service-2.webp",
      order: 2,
      bannerImage: "/images/faden/service-banner-2.webp",
      bannerSubtitle: "Foundation of Modern Communities",
      sections: [
        {
          id: "sec-2",
          type: "OVERVIEW",
          title: "Civil Infrastructure & Earthmoving",
          subtitle: "Heavy excavation and ground engineering",
          content: {
            paragraphs: [
              "Equipped with advanced heavy machinery fleet, FADEN handles the largest earthmoving, grading, and civil infrastructure operations across the Kingdom.",
            ],
          },
          img: "/images/faden/service-overview-2.webp",
          order: 1,
        },
        {
          id: "why-choose",
          type: "SHARED_WHY_CHOOSE",
          order: 2,
        },
      ],
    },
  });

  // 4. Seed Projects
  await prisma.project.upsert({
    where: { slug: "riyadh-financial-tower" },
    update: {},
    create: {
      id: "prj_riyadh_tower",
      title: "Riyadh Financial Tower",
      slug: "riyadh-financial-tower",
      img: "/images/faden/project-1.webp",
      status: "Finished",
      partnershipType: "Faden Only",
      order: 1,
      client: "Ministry of Housing",
      location: "Riyadh, Saudi Arabia",
      country: "Saudi Arabia",
      service: {
        id: generalContracting.id,
        name: generalContracting.name,
        slug: generalContracting.slug,
      },
      createdAt: new Date("2025-06-15"),
    },
  });

  await prisma.project.upsert({
    where: { slug: "southern-highway-expansion" },
    update: {},
    create: {
      id: "prj_southern_highway",
      title: "Southern Highway Expansion",
      slug: "southern-highway-expansion",
      img: "/images/faden/project-2.webp",
      status: "In Progress",
      partnershipType: "With Global Energy",
      order: 2,
      client: "Ministry of Transport",
      location: "Jeddah - Makkah, Saudi Arabia",
      country: "Saudi Arabia",
      service: {
        id: infrastructure.id,
        name: infrastructure.name,
        slug: infrastructure.slug,
      },
      createdAt: new Date("2025-08-20"),
    },
  });

  // 5. Seed Equipment
  await prisma.equipment.upsert({
    where: { id: "eq_1" },
    update: {},
    create: {
      id: "eq_1",
      name: "CAT 349 Excavator",
      count: 14,
      image: "/images/faden/equipment-1.webp",
      rotate: false,
    },
  });

  await prisma.equipment.upsert({
    where: { id: "eq_2" },
    update: {},
    create: {
      id: "eq_2",
      name: "Liebherr Tower Crane 280 EC-H",
      count: 8,
      image: "/images/faden/equipment-2.webp",
      rotate: true,
    },
  });

  // 6. Seed Clients
  await prisma.client.upsert({
    where: { id: "cli_1" },
    update: {},
    create: {
      id: "cli_1",
      name: "Saudi Aramco",
      logo: "/images/faden/client-1.webp",
    },
  });

  await prisma.client.upsert({
    where: { id: "cli_2" },
    update: {},
    create: {
      id: "cli_2",
      name: "Red Sea Global",
      logo: "/images/faden/client-2.webp",
    },
  });

  // 7. Seed Gallery Images
  await prisma.galleryImage.upsert({
    where: { id: "gal_1" },
    update: {},
    create: {
      id: "gal_1",
      src: "/images/faden/gallery-1.webp",
      alt: "Riyadh Tower Concrete Pouring",
      position: "center top",
    },
  });

  await prisma.galleryImage.upsert({
    where: { id: "gal_2" },
    update: {},
    create: {
      id: "gal_2",
      src: "/images/faden/gallery-2.webp",
      alt: "Highway Earthworks and Fleet",
      position: "center center",
    },
  });

  // 8. Seed Site Settings
  await prisma.settings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      branding: {
        colors: {
          brandPrimary: "#C69214",
          brandPrimaryHover: "#AA7A0C",
          brandSecondary: "#1E293B",
          brandAccent: "#F59E0B",
          foreground: "#0F172A",
          muted: "#F1F5F9",
          mutedForeground: "#64748B",
          border: "#E2E8F0",
        },
        logoDark: "/images/faden/logo-dark.svg",
        logoLight: "/images/faden/logo-light.svg",
      },
      navigation: {
        items: [
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Projects", href: "/projects" },
          { label: "Equipment", href: "/equipment" },
          { label: "Gallery", href: "/gallery" },
          { label: "Contact", href: "/contact" },
        ],
      },
      socialLinks: [
        { label: "LinkedIn", icon: "linkedin", href: "https://linkedin.com" },
        { label: "Twitter", icon: "twitter", href: "https://twitter.com" },
        { label: "Instagram", icon: "instagram", href: "https://instagram.com" },
      ],
      footer: {
        quickLinks: [
          { label: "About Us", href: "/about" },
          { label: "Our Services", href: "/services" },
          { label: "Featured Projects", href: "/projects" },
          { label: "Contact Us", href: "/contact" },
        ],
        contact: {
          address: "King Abdulaziz Road, Riyadh, Kingdom of Saudi Arabia",
          phone: "+966 11 234 5678",
          email: "info@fadensa.com",
        },
        copyrightText: "© 2026 FADEN Contracting Co. All rights reserved.",
      },
      seo: {
        baseUrl: "https://fadensa.com",
        titleDefault: "FADEN Contracting Co. | Premier Construction & Civil Contracting",
        titleTemplate: "%s | FADEN Contracting Co.",
        description:
          "Leading contracting company in Saudi Arabia specializing in commercial, industrial, and civil infrastructure developments.",
        keywords: [
          "Faden Contracting",
          "Saudi Construction",
          "General Contracting Riyadh",
          "Civil Engineering KSA",
        ],
      },
    },
  });

  // 9. Seed Singletons (GalleryMeta, ProjectsMeta, ServicesMeta, EquipmentMeta, ClientsMeta, ContactPage, About Pages, HomeFeatures)
  await prisma.galleryMeta.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      intro: {
        eyebrow: "Visual Showcase",
        subtitle: "A glimpse into our landmark projects and heavy machinery fleet across the Kingdom.",
      },
      itemsPerPage: 12,
    },
  });

  await prisma.projectsMeta.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      banner: {
        title: "Our Portfolio of Landmark Projects",
        subtitle: "Exemplary engineering and construction across Saudi Arabia and Egypt.",
      },
    },
  });

  await prisma.servicesMeta.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      banner: {
        title: "Comprehensive Contracting & Engineering Solutions",
        subtitle: "Delivering end-to-end capabilities tailored to complex architectural and civil challenges.",
      },
      sectors: {
        title: "Key Sectors We Serve",
        subtitle: "Commercial, residential, industrial, and governmental infrastructure.",
      },
      cta: {
        title: "Partner with FADEN for Your Next Build",
        subtitle: "Speak to our engineering consultants today.",
      },
    },
  });

  await prisma.equipmentMeta.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      intro: {
        eyebrow: "Fleet & Logistics",
        subtitle: "Heavy Machinery & Modern Construction Equipment",
        description: "An extensive fleet maintained to highest international readiness benchmarks.",
      },
      heavy: {
        eyebrow: "Heavy Fleet",
        subtitle: "Excavators, Cranes, Loaders, and Earthmoving Equipment",
      },
    },
  });

  await prisma.clientsMeta.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
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

  await prisma.contactPage.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      banner: {
        title: "Get in Touch with FADEN",
        subtitle: "We welcome your inquiries, RFPs, and partnership requests.",
        image: "/images/faden/contact-banner.webp",
      },
      info: {
        title: "Contact Details",
        subtitle: "Visit our headquarters or contact our team directly.",
      },
      form: {
        title: "Send Us a Message",
        fields: {
          fullName: { label: "Full Name", placeholder: "e.g. Abdullah Al-Mansoor" },
          email: { label: "Email Address", placeholder: "e.g. name@company.com" },
          phone: { label: "Phone Number", placeholder: "e.g. +966 50 000 0000" },
          subject: { label: "Subject / Service of Interest", placeholder: "e.g. General Contracting Inquiry" },
          message: { label: "Your Message", placeholder: "Please describe your project or request..." },
        },
        submitLabel: "Submit Message",
        successMessage: "Thank you for reaching out. A FADEN representative will contact you shortly.",
        errorMessage: "Something went wrong while submitting. Please try again or call us directly.",
      },
      map: {
        eyebrow: "Our Location",
        subtitle: "Headquarters in Riyadh, Kingdom of Saudi Arabia",
        embedUrl: "https://maps.google.com",
      },
    },
  });

  await prisma.aboutOverview.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      banner: {
        title: "About FADEN Contracting",
        subtitle: "Building the foundations of progress across the Kingdom.",
        backgroundImage: "/images/faden/about-overview-banner.webp",
      },
      intro: {
        eyebrow: "Company Overview",
        lead: "A distinguished general contracting powerhouse committed to Vision 2030.",
        paragraphs: [
          "FADEN Contracting delivers end-to-end contracting, civil engineering, and infrastructure services.",
          "Through relentless dedication to safety, precision, and technological adoption, we consistently exceed client expectations on every project.",
        ],
        quote: "Engineering tomorrow with unwavering precision today.",
      },
      stats: [
        { icon: "shield-check", value: "100%", description: "Safety & Compliance Commitment" },
        { icon: "wrench", value: "50+", description: "Heavy Machinery Assets Owned" },
        { icon: "users", value: "300+", description: "Dedicated Engineers & Specialists" },
        { icon: "globe", value: "2", description: "Operating Countries (KSA & Egypt)" },
      ],
    },
  });

  await prisma.aboutVisionMission.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      banner: {
        title: "Vision & Mission",
        subtitle: "Guided by purposeful values and ambitious aspirations.",
        backgroundImage: "/images/faden/about-vision-banner.webp",
      },
      drivers: {
        eyebrow: "Core Drivers",
        subtitle: "Guiding Principles for Sustainable Growth",
        primary: [
          {
            title: "Our Vision",
            description: "To be the most trusted and innovative contracting company in the region.",
          },
          {
            title: "Our Mission",
            description:
              "To deliver superior quality engineering and construction solutions with unyielding commitment to safety, timeliness, and sustainability.",
          },
        ],
        secondary: [
          { title: "Integrity", description: "Transparent, honest, and ethical conduct in all relationships." },
          { title: "Excellence", description: "Relentless pursuit of exceptional craftsmanship and precision." },
          { title: "Innovation", description: "Adopting modern construction methods and digital engineering." },
        ],
      },
      different: {
        eyebrow: "What Sets Us Apart",
        subtitle: "The FADEN Advantage",
        image: "/images/faden/about-different.webp",
        imageAlt: "FADEN Advantage",
        items: [
          { title: "Self-Sufficient Equipment Fleet", content: "Zero project delays waiting for leased machinery." },
          { title: "Agile Project Management", content: "Rapid mobilization and adaptive delivery frameworks." },
        ],
      },
    },
  });

  await prisma.aboutLeadership.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      banner: {
        title: "Leadership Messages",
        subtitle: "Experienced executive stewardship directing our journey.",
        backgroundImage: "/images/faden/about-leadership-banner.webp",
      },
      messages: [
        {
          name: "Eng. Leadership Team",
          eyebrow: "Board of Directors",
          subtitle: "Chairman Message",
          image: "/images/faden/chairman.webp",
          description: "Our journey has been built on trust, engineering rigor, and national pride.",
        },
      ],
      subsidiaries: {
        eyebrow: "Group Subsidiaries",
        subtitle: "Integrated services under one umbrella",
        logos: [],
      },
    },
  });

  await prisma.aboutPartners.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
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
        description: "Joint venture collaboration expanding our capabilities in heavy industrial contracting.",
        bullets: ["Integrated EPC Delivery", "Cross-Border Technical Expertise", "Shared Machinery Fleet"],
      },
      achievements: {
        eyebrow: "Joint Milestones",
        subtitle: "Key Highlights",
        items: [
          { icon: "shield-check", title: "Mega Projects", description: "Multiple joint developments successfully completed." },
        ],
      },
      projects: {
        eyebrow: "Collaborative Projects",
        subtitle: "Delivered jointly with partners",
        items: [],
      },
    },
  });

  await prisma.homeFeatures.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      gallery: ["gal_1", "gal_2"],
      projects: ["prj_riyadh_tower", "prj_southern_highway"],
      services: ["srv_general_contracting", "srv_infrastructure"],
      clients: ["cli_1", "cli_2"],
      equipment: ["eq_1", "eq_2"],
    },
  });

  console.log("✅ Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

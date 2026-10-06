import { nanoid } from "nanoid";
import prisma from "../../../database/Connection.db.js";

export const createSubmission = async (data: {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) => {
  if (!data.fullName || !data.email || !data.phone || !data.subject || !data.message) {
    const error: any = new Error("All fields are required");
    error.status = 400;
    throw error;
  }

  return await prisma.contactSubmission.create({
    data: {
      id: `sub_${nanoid(8)}`,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      read: false,
      createdAt: new Date(),
    },
  });
};

export const getContactPage = async () => {
  let contactPage = await prisma.contactPage.findUnique({
    where: { id: "singleton" },
  });

  if (!contactPage) {
    contactPage = await prisma.contactPage.create({
      data: {
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
          fields: {},
          submitLabel: "Submit Message",
          successMessage: "Thank you for reaching out.",
          errorMessage: "Something went wrong.",
        },
        map: {
          eyebrow: "Our Location",
          subtitle: "Riyadh, Saudi Arabia",
          embedUrl: "https://maps.google.com",
        },
      },
    });
  }

  // Read settings.footer.contact to build info.items dynamically
  const settings = await prisma.settings.findUnique({
    where: { id: "singleton" },
  });

  const contact = (settings?.footer as any)?.contact || {
    address: "King Abdulaziz Road, Riyadh, Kingdom of Saudi Arabia",
    phone: "+966 11 234 5678",
    email: "info@fadensa.com",
  };

  const dynamicItems = [
    { icon: "map-pin", label: "Our Address", value: contact.address || "" },
    {
      icon: "mail",
      label: "Email Us",
      value: contact.email || "",
      href: `mailto:${contact.email || ""}`,
    },
    {
      icon: "phone",
      label: "Call Us",
      value: contact.phone || "",
      href: `tel:${(contact.phone || "").replace(/[^\d+]/g, "")}`,
    },
  ];

  return {
    ...contactPage,
    info: {
      ...(typeof contactPage.info === "object" && contactPage.info !== null
        ? contactPage.info
        : {}),
      items: dynamicItems,
    },
  };
};

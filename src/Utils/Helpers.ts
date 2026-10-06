import * as db from "../database/dbService.js";
import { errorResponse } from "./Response.js";
import { NextFunction, Request } from "express";
import path from "path";
import fs from "fs";

/**
 * Deep merge source object into target object without mutating or wiping sibling keys
 */
export function deepMerge(target: any, source: any): any {
  if (!source || typeof source !== "object" || Array.isArray(source)) {
    return source !== undefined ? source : target;
  }
  if (!target || typeof target !== "object" || Array.isArray(target)) {
    return { ...source };
  }
  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] !== null &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      output[key] = deepMerge(target[key] || {}, source[key]);
    } else if (source[key] !== undefined) {
      output[key] = source[key];
    }
  }
  return output;
}

/**
 * Generate default project detail if detail is null or missing in DB
 */
export function defaultProjectDetail(project: any) {
  if (
    project.detail &&
    typeof project.detail === "object" &&
    Object.keys(project.detail).length > 0
  ) {
    return project.detail;
  }

  const serviceName =
    typeof project.service === "object" && project.service?.name
      ? project.service.name
      : "General Contracting";

  return {
    overview: {
      label: "Project Overview",
      caption: "Executive Summary",
      paragraphs: [
        `${project.title} represents a premier development delivered for ${project.client || "our client"} in ${project.location || "Saudi Arabia"}.`,
        `Executed under the ${serviceName} sector, the project adheres to the highest industry standards of quality, safety, and operational excellence.`,
      ],
    },
    infoTabs: {
      details: {
        left: [
          { label: "Client", value: project.client || "Client" },
          { label: "Location", value: project.location || "Saudi Arabia" },
          { label: "Status", value: project.status || "Finished" },
        ],
        right: [
          { label: "Service", value: serviceName },
          { label: "Partnership", value: project.partnershipType || "Faden Only" },
          { label: "Country", value: project.country || "Saudi Arabia" },
        ],
      },
    },
    designIntent: {
      label: "Design Intent",
      caption: "Architectural & Engineering Vision",
      paragraphs: [
        `Designed and engineered to achieve sustainable operational efficiency and enduring structural reliability.`,
      ],
      image: project.img || "",
    },
    amenitiesFeatures: {
      label: "Key Features & Capabilities",
      caption: "Project Highlights",
      items: [
        "Advanced structural concrete engineering",
        "High-grade architectural finishes",
        "Compliance with international safety & quality codes",
      ],
    },
    keyAchievements: {
      label: "Key Achievements",
      caption: "Delivery Milestones",
      items: [
        "Delivered with zero lost-time incidents",
        "Seamless coordination across multi-disciplinary engineering teams",
      ],
    },
    photos: project.img ? [project.img] : [],
    photosCaption: "",
  };
}

export const destructData = ({ body, allowed }: { body: Record<string, any>; allowed: string[] }): Record<string, unknown> => {
  return Object.keys(body).reduce((acc: Record<string, unknown>, key) => {
    if (allowed.includes(key)) {
      acc[key] = body[key];
    }
    return acc;
  }, {});
};

export const deleteFile = (relativePath: string): void => {
  if (!relativePath) return;
  try {
    const fullPath = path.resolve(`./${relativePath}`);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (error) {
    console.error(`Error deleting file: ${relativePath}`, error);
  }
};

import { PrismaClient } from "@prisma/client";

export const runtime = "edge";

export const prisma = new PrismaClient();

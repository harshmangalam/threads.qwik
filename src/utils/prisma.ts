import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client";
import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

export function getPrisma(env: EnvGetter) {
  const libsql = createClient({
    url: env.get("TURSO_DATABASE_URL")!,
    authToken: env.get("TURSO_AUTH_TOKEN")!,
  });
  const adapter = new PrismaLibSQL(libsql);

  const prisma = new PrismaClient({
    adapter,
  }).$extends(withAccelerate());

  return prisma;
}

import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";

export function getPrisma(env: EnvGetter) {
  return new PrismaClient({
    datasources: {
      db: {
        url: env.get("DATABASE_URL"),
      },
    },
  }).$extends(withAccelerate());
}

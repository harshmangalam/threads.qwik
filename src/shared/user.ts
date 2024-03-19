import { Session } from "@auth/core/types";
import { routeAction$, zod$ } from "@builder.io/qwik-city";

export const useFollowUser = routeAction$(
  ({ userId }, { sharedMap, error }) => {
    const session: Session | null = sharedMap.get("session");
    if (!session || new Date(session.expires) < new Date()) {
      throw error(401, "Unauthorized");
    }
  },
  zod$((z) => ({
    userId: z.string(),
  })),
);

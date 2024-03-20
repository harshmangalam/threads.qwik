import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import type { User } from "@prisma/client";
import { Button } from "~/components/ui/button";
import { useFollowUser } from "~/shared/user";

type UserCardProps = {
  user: Pick<User, "id" | "name" | "image" | "username">;
};
export const UserCard = component$(({ user }: UserCardProps) => {
  const followUser = useFollowUser();
  return (
    <article class="card bg-base-200">
      <div class="card-body flex flex-col items-center gap-4 p-4">
        <div class="avatar flex-none">
          <div class="w-20 rounded-full">
            <img src={user.image} alt={user.username} width={80} height={80} />
          </div>
        </div>

        <div class="flex flex-col gap-0">
          <h3 class="font-semibold">{user.name}</h3>
          <span class="opacity-60">{user.username}</span>
        </div>

        <Form action={followUser} class="w-full">
          <input type="hidden" name="userId" value={user.id} />
          <Button
            fullWidth
            size="btn-sm"
            colorScheme="btn-neutral"
            loading={followUser.isRunning}
            type="submit"
          >
            Follow
          </Button>
        </Form>
      </div>
    </article>
  );
});

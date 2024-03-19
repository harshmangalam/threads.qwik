import { component$ } from "@builder.io/qwik";
import type { User } from "@prisma/client";

type UserCardProps = {
  user: Pick<User, "id" | "name" | "image" | "username">;
};
export const UserCard = component$(({ user }: UserCardProps) => {
  return (
    <article class="card bg-base-200">
      <div class="card-body flex flex-col items-center gap-4 p-4">
        <div class="avatar flex-none">
          <div class="w-20 rounded-full">
            <img src={user.image} alt={user.name} width={80} height={80} />
          </div>
        </div>

        <div class="flex flex-col gap-0">
          <h3 class="font-semibold">{user.name}</h3>
          <span class="opacity-60">{user.name}</span>
        </div>

        <div class="w-full">
          <button class="btn btn-neutral btn-sm btn-block">Follow</button>
        </div>
      </div>
    </article>
  );
});

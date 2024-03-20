import { component$ } from "@builder.io/qwik";
import { type UserSuggestionType } from "~/shared/user";
import { FollowAction } from "../follow-action";
import { Link } from "@builder.io/qwik-city";

type UserCardProps = {
  user: Pick<
    UserSuggestionType,
    "id" | "name" | "image" | "username" | "isFollowing" | "shouldFollowBack"
  >;
};
export const UserCard = component$(({ user }: UserCardProps) => {
  return (
    <Link href={`/${user.username}/`}>
      <article class="card bg-base-200">
        <div class="card-body flex flex-col items-center gap-4 p-4">
          <div class="avatar flex-none">
            <div class="w-20 rounded-full">
              <img
                src={user.image}
                alt={user.username}
                width={80}
                height={80}
              />
            </div>
          </div>

          <div class="flex flex-col gap-0">
            <h3 class="font-semibold">{user.name}</h3>
            <span class="opacity-60">{user.username}</span>
          </div>

          <FollowAction
            id={user.id}
            isFollowing={user.isFollowing}
            shouldFollowBack={user.shouldFollowBack}
          />
        </div>
      </article>
    </Link>
  );
});

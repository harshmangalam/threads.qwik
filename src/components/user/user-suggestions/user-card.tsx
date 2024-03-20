import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button";
import { type UserSuggestionType, useFollowUser } from "~/shared/user";

type UserCardProps = {
  user: Pick<
    UserSuggestionType,
    "id" | "name" | "image" | "username" | "isFollowing" | "shouldFollowBack"
  >;
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
            colorScheme={user.isFollowing ? "btn-ghost" : "btn-neutral"}
            loading={followUser.isRunning}
            type="submit"
            outline={user.isFollowing}
          >
            {user.isFollowing
              ? "Unfollow"
              : user.shouldFollowBack
                ? "Follow back"
                : "Follow"}
          </Button>
        </Form>
      </div>
    </article>
  );
});

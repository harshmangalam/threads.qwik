import { component$ } from "@builder.io/qwik";
import { Avatar } from "~/components/ui/avatar";
import { FollowAction } from "~/components/user/follow-action";
import { type UserSearchType } from "~/shared/users";

type UserProps = {
  user: UserSearchType;
};
export const User = component$(({ user }: UserProps) => {
  return (
    <article class="flex gap-3">
      <div class="flex-none">
        <Avatar rounded="rounded-full" src={user.image} size="md" />
      </div>
      <div class="w-full">
        <div class="flex w-full flex-col gap-1">
          <div class="flex w-full items-center justify-between">
            <div>
              <h3 class="font-medium">{user.username}</h3>
              <h4 class="opacity-60">{user.name}</h4>
            </div>
            <div>
              <FollowAction
                id={user.id}
                isFollowing={user.isFollowing}
                shouldFollowBack={user.shouldFollowBack}
              />
            </div>
          </div>
          <div>{user.followersCount} followers</div>
        </div>
        <div class="divider my-2 opacity-60"></div>
      </div>
    </article>
  );
});

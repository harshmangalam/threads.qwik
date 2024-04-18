import { component$ } from "@builder.io/qwik";
import { Avatar } from "~/components/ui/avatar";
import { type UserListType } from "~/shared/users";
import { FollowAction } from "./follow-action";
type UserFollowProps = {
  user: UserListType;
};
export const UserFollow = component$(({ user }: UserFollowProps) => {
  return (
    <article class="flex items-center justify-between gap-3">
      <div class="flex w-full flex-1 items-center gap-3">
        <Avatar rounded="rounded-full" src={user.image} />
        <div class="flex flex-col">
          <h4 class="font-medium">{user.username}</h4>
          <div class="opacity-60">{user.name}</div>
        </div>
      </div>
      <div>
        <FollowAction
          id={user.id}
          isFollowing={user.isFollowing}
          shouldFollowBack={user.shouldFollowBack}
        />
      </div>
    </article>
  );
});

import { component$ } from "@builder.io/qwik";
import { formatDistanceToNow } from "date-fns";
import { Avatar } from "~/components/ui/avatar";
import { type UserSuggestionType } from "~/shared/user";
import UserLikeIcon from "~/assets/icons/heart.svg?jsx";
type LikeUserProps = {
  user: Pick<UserSuggestionType, "name" | "username" | "image">;
  likedAt: Date;
};
export const LikeUser = component$(({ user, likedAt }: LikeUserProps) => {
  return (
    <article class="flex items-center gap-3">
      <div class="relative">
        <Avatar rounded="rounded-full" src={user.image} />
        <div class="absolute bottom-0 right-0">
          <div class="grid h-4 w-4 place-items-center rounded-full bg-error text-error-content">
            <UserLikeIcon class="h-2 w-2 fill-white text-white" />
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center gap-4">
          <h4 class="font-medium">{user.username}</h4>
          <div class="text-sm opacity-60">{formatDistanceToNow(likedAt)}</div>
        </div>
        <div class="opacity-60">{user.name}</div>
      </div>
    </article>
  );
});

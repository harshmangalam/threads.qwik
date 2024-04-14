import { component$ } from "@builder.io/qwik";
import { getRelativeTime } from "~/utils/date";
import { Avatar } from "~/components/ui/avatar";
import { type UserSuggestionType } from "~/shared/users";
import UserLikeIcon from "~/assets/icons/heart.svg?jsx";
import UserRepostIcon from "~/assets/icons/repost-check.svg?jsx";
type LikeUserProps = {
  user: Pick<UserSuggestionType, "name" | "username" | "image">;
  date: Date;
  activityType: "like" | "repost";
};
export const UserCard = component$(
  ({ user, date, activityType }: LikeUserProps) => {
    return (
      <article class="flex items-center gap-3">
        <div class="relative">
          <Avatar rounded="rounded-full" src={user.image} />
          <div class="absolute bottom-0 right-0">
            {activityType === "like" && (
              <div class="grid h-4 w-4 place-items-center rounded-full bg-error text-error-content">
                <UserLikeIcon class="h-2 w-2 fill-white text-white" />
              </div>
            )}
            {activityType === "repost" && (
              <div class="grid h-4 w-4 place-items-center rounded-full bg-info text-info-content">
                <UserRepostIcon class="h-3 w-3 fill-white text-white" />
              </div>
            )}
          </div>
        </div>
        <div>
          <div class="flex items-center gap-4">
            <h4 class="font-medium">{user.username}</h4>
            <div class="text-sm opacity-60">{getRelativeTime(date)}</div>
          </div>
          <div class="opacity-60">{user.name}</div>
        </div>
      </article>
    );
  },
);

import { Slot, component$ } from "@builder.io/qwik";
import { MoreDropdown } from "./more-dropdown";
import { ProfileTabs } from "./profile-tabs";
import { useAuthSession } from "~/routes/plugin@auth";
import { EditProfileModal } from "./edit-profile-modal";
import { GithubAccount } from "./github-account";
import { ImagePreview } from "./image-preview";
import PrivateIcon from "~/assets/icons/private.svg?jsx";
import { FollowAction } from "~/components/user/follow-action";
import {
  useGetFollowersCount,
  useGetUser,
  useUpdateUserProfile,
} from "~/shared/users";
import { Link } from "@builder.io/qwik-city";
export { useGetUser, useUpdateUserProfile, useGetFollowersCount };

export default component$(() => {
  const user = useGetUser();
  const session = useAuthSession();
  const followersCount = useGetFollowersCount();
  return (
    <div>
      {/* profile details section  */}
      <section class="py-4">
        <div class="flex items-center justify-between gap-4">
          <div>
            <div class="flex flex-col gap-1">
              <h2 class="text-2xl font-bold">{user.value.name}</h2>
              <div class="flex items-center gap-2">
                <div class="opacity-80">{user.value.username}</div>
                <div class="badge badge-ghost text-xs opacity-60">
                  threads.qwik
                </div>
                {user.value.private && (
                  <PrivateIcon class="h-4 w-4 opacity-50" />
                )}
              </div>
            </div>
          </div>
          <div class="flex-none">
            {user.value.image && (
              <ImagePreview src={user.value.image}>
                <img
                  alt={user.value.username}
                  src={user.value.image}
                  class="h-24 w-24 rounded-full"
                  width={96}
                  height={96}
                />
              </ImagePreview>
            )}
          </div>
        </div>

        <div class="mt-4">
          <p class="text-sm opacity-90">{user.value.bio}</p>
        </div>
        <div class="mt-4 flex items-center justify-between gap-4">
          <div class="flex items-center gap-2 text-sm opacity-60">
            <Link href={`/${user.value.username}/followers`}>
              {followersCount.value}{" "}
              {followersCount.value > 1 ? "followers" : "follower"}
            </Link>
            {user.value.link && <div>·</div>}
            {user.value.link && (
              <a href={user.value.link} target="_blank">
                {user.value.link}
              </a>
            )}
          </div>
          <div class="flex items-center">
            <GithubAccount username={user.value.username} />
            {session.value?.user.id !== user.value.id && <MoreDropdown />}
          </div>
        </div>
      </section>

      <section class="py-3">
        {session.value?.user.id === user.value.id ? (
          <EditProfileModal user={user.value} />
        ) : (
          <div class="grid grid-cols-2 gap-3">
            <FollowAction
              id={user.value.id}
              isFollowing={user.value.isFollowing}
              shouldFollowBack={user.value.shouldFollowBack}
            />
            <button class="btn btn-sm">Mention</button>
          </div>
        )}
      </section>

      <ProfileTabs username={user.value.username} />

      <div class="py-4">
        <Slot />
      </div>
    </div>
  );
});

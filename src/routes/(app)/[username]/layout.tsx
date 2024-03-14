import { Slot, component$ } from "@builder.io/qwik";
import InstagramIcon from "~/assets/icons/instagram.svg?jsx";
import { MoreDropdown } from "./more-dropdown";
import { ProfileTabs } from "./profile-tabs";
import { routeLoader$ } from "@builder.io/qwik-city";
import { prisma } from "~/utils/prisma";
import { useAuthSession } from "~/routes/plugin@auth";
import { EditProfileModal } from "./edit-profile-modal";

export const useGetUser = routeLoader$(async ({ params, error }) => {
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
  });

  if (!user) {
    throw error(404, "User not found");
  }
  return user;
});
export default component$(() => {
  const user = useGetUser();
  const session = useAuthSession();

  return (
    <div>
      {/* profile details section  */}
      <section class="py-4">
        <div class="flex items-center gap-1">
          <div class="flex-1">
            <div class="flex flex-col gap-1">
              <h2 class="text-2xl font-bold">{user.value.name}</h2>
              <div class="flex items-center gap-2">
                <div class="opacity-80">{user.value.username}</div>
                <div class="badge badge-ghost text-xs opacity-60">
                  threads.qwik
                </div>
              </div>
            </div>
          </div>

          <div class="flex-none">
            {user.value.image && (
              <div class="avatar">
                <div class="w-24 rounded-full">
                  <img width={96} height={96} src={user.value.image} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div class="mt-4">
          <p class="text-sm opacity-90">{user.value.bio}</p>
        </div>
        <div class="mt-4 flex items-center justify-between gap-4">
          <div class="flex items-center gap-2 text-sm opacity-60">
            <div>13K followers</div>
            <div>·</div>
            {<div>harshmangalam.dev</div>}
          </div>
          <div class="flex items-center">
            <a href="/" class="btn btn-circle btn-ghost">
              <InstagramIcon class="h-6 w-6 fill-current" />
            </a>
            {session.value?.user.id !== user.value.id && <MoreDropdown />}
          </div>
        </div>
      </section>

      <section class="py-3">
        {session.value?.user.id === user.value.id ? (
          <EditProfileModal />
        ) : (
          <div class="grid grid-cols-2 gap-3">
            <button class="btn btn-neutral btn-sm">Follow</button>
            <button class="btn btn-sm">Mention</button>
          </div>
        )}
      </section>

      <ProfileTabs />

      <div class="py-4">
        <Slot />
      </div>
    </div>
  );
});

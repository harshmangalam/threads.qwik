import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { UserFollow } from "~/components/user/user-follow";
import { type UserListType, getFollowers, getFollowings } from "~/shared/users";

export const FollowsModal = component$(
  ({ userId, followersCount }: { userId: string; followersCount: number }) => {
    const modal = useSignal<HTMLDialogElement>();
    const tab = useSignal<"followers" | "followings">("followers");
    const users = useSignal<UserListType[]>([]);

    useTask$(async ({ track }) => {
      track(() => tab.value);
      if (tab.value === "followers") {
        const followers = await getFollowers(userId);
        users.value = followers;
      } else {
        const followings = await getFollowings(userId);
        users.value = followings;
      }
    });
    return (
      <div>
        <button
          onClick$={async () => {
            modal.value?.showModal();
            tab.value = "followers";
          }}
        >
          {followersCount} {followersCount >= 2 ? "followers" : "follower"}
        </button>

        <dialog ref={modal} class="modal">
          <div class="modal-box w-full max-w-xl">
            <div role="tablist" class="tabs tabs-bordered">
              <button
                onClick$={() => (tab.value = "followers")}
                role="tab"
                class={`tab ${tab.value === "followers" ? "tab-active" : ""}`}
              >
                Followers
              </button>
              <button
                onClick$={() => (tab.value = "followings")}
                role="tab"
                class={`tab ${tab.value === "followings" ? "tab-active" : ""}`}
              >
                Followings
              </button>
            </div>

            <div class="mt-6 flex flex-col gap-2">
              {users.value.map((user) => (
                <UserFollow user={user} key={user.id} />
              ))}
            </div>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    );
  },
);

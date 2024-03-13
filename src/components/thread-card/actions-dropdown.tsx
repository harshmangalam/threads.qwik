import { component$ } from "@builder.io/qwik";
import MenuIcon from "~/assets/icons/menu-horiz.svg?jsx";
import { useAuthSession } from "~/routes/plugin@auth";
import { useDeleteThread } from "~/shared/thread";
import { EditReplyPrivacy } from "./edit-reply-privacy";

export const ActionsDropdown = component$(
  ({
    userId,
    threadId,
    replyPrivacy,
  }: {
    userId: string;
    threadId: string;
    replyPrivacy: string;
  }) => {
    const session = useAuthSession();
    const deleteThread = useDeleteThread();
    const isCurrentUser = session.value?.user.id === userId;
    return (
      <div class="dropdown dropdown-end">
        <div tabIndex={0} role="button" class="btn btn-circle btn-ghost btn-sm">
          <MenuIcon class="h-6 w-6" />
        </div>
        <ul
          tabIndex={0}
          class="menu  dropdown-content z-[1] w-44  rounded-xl   bg-base-100 shadow-md"
        >
          <li>
            <button>Save</button>
          </li>
          <li>
            <button>Hide</button>
          </li>
          <li>
            <button>Mute</button>
          </li>
          {isCurrentUser && (
            <EditReplyPrivacy replyPrivacy={replyPrivacy} threadId={threadId} />
          )}
          <li>
            {isCurrentUser ? (
              <button
                onClick$={() => deleteThread.submit({ threadId })}
                class="flex justify-start font-medium text-error"
              >
                Delete
              </button>
            ) : (
              <button class="font-medium text-error">Unfollow</button>
            )}
          </li>
        </ul>
      </div>
    );
  },
);

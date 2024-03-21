import { component$ } from "@builder.io/qwik";
import MenuIcon from "~/assets/icons/menu-horiz.svg?jsx";
import { useAuthSession } from "~/routes/plugin@auth";
import { type ThreadType, useDeleteThread } from "~/shared/thread";
import { EditReplyPrivacy } from "./edit-reply-privacy";
import { SaveThread } from "./save-thread";

export const ActionsDropdown = component$(
  ({ thread }: { thread: ThreadType }) => {
    const session = useAuthSession();
    const deleteThread = useDeleteThread();
    const isCurrentUser = session.value?.user.id === thread.userId;
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
            <SaveThread isSaved={thread.isSaved} threadId={thread.id} />
          </li>
          <li>
            <button>Hide</button>
          </li>
          <li>
            <button>Mute</button>
          </li>
          {isCurrentUser && (
            <EditReplyPrivacy
              replyPrivacy={thread.replyPrivacy}
              threadId={thread.id}
            />
          )}
          <li>
            {isCurrentUser ? (
              <button
                onClick$={() => deleteThread.submit({ threadId: thread.id })}
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

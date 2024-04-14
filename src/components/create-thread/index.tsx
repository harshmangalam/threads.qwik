import { Slot, component$, useSignal } from "@builder.io/qwik";
import { ReplyDropdown } from "./reply-dropdown";
import { Form } from "@builder.io/qwik-city";
import { useCreateThread } from "~/routes/(app)/layout";
import { useAuthSession } from "~/routes/plugin@auth";
import { type ThreadType } from "~/shared/thread";
import { SimpleThread } from "../thread-card/simple-thread";

type CreateThreadProps = {
  isReply?: boolean;
  thread?: ThreadType;
};
export const CreateThread = component$((props: CreateThreadProps) => {
  const { isReply = false, thread } = props;
  const session = useAuthSession();
  const createThread = useCreateThread();
  const modal = useSignal<HTMLDialogElement>();
  return (
    <div>
      <div onClick$={() => modal.value?.showModal()}>
        <Slot />
      </div>
      <dialog ref={modal} class="modal">
        <div class="modal-box">
          {isReply && thread && (
            <div class="mb-4">
              <SimpleThread thread={thread} />
            </div>
          )}
          <Form
            action={createThread}
            onSubmitCompleted$={() => {
              modal.value?.close();
            }}
          >
            <div class="flex gap-3">
              {session.value?.user.image && (
                <div class="avatar">
                  <div class="h-9 w-9 rounded-full">
                    <img
                      alt={session.value.user.username}
                      width={36}
                      height={36}
                      class="h-9 w-9"
                      src={session.value.user.image}
                    />
                  </div>
                </div>
              )}
              <div class="flex flex-1 flex-col gap-1">
                <h3 class="font-medium">{session.value?.user.username}</h3>
                {isReply && thread && (
                  <input type="hidden" name="threadId" value={thread.id} />
                )}
                <textarea
                  autoFocus
                  name="text"
                  id="text"
                  rows={2}
                  class="focus:outline-none"
                  placeholder={
                    isReply && thread
                      ? `Reply to ${thread.user.username}...`
                      : "Start a thread..."
                  }
                ></textarea>
              </div>
            </div>

            <footer class="mt-4 flex items-center justify-between gap-4">
              <ReplyDropdown />
              <button type="submit" class="btn btn-neutral btn-sm rounded-full">
                Post
              </button>
            </footer>
          </Form>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
});

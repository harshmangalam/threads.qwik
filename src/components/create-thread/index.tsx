import { Slot, component$, useSignal } from "@builder.io/qwik";
import { ReplyDropdown } from "./reply-dropdown";

export const CreateThread = component$(() => {
  const modal = useSignal<HTMLDialogElement>();
  return (
    <div>
      <div onClick$={() => modal.value?.showModal()}>
        <Slot />
      </div>
      <dialog ref={modal} class="modal">
        <div class="modal-box">
          <h3 class="text-lg font-bold">Hello!</h3>
          <p class="py-4">Press ESC key or click outside to close</p>
          <footer class="flex items-center justify-between gap-4">
            <ReplyDropdown />
            <button class="btn btn-neutral btn-sm rounded-full">Post</button>
          </footer>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
});

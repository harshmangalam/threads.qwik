import { Slot, component$, useSignal, type QRL } from "@builder.io/qwik";

type DeleteModalProps = {
  onDelete: QRL<() => any>;
  title: string;
  description: string;
};

export const DeleteModal = component$(
  ({ onDelete, title, description }: DeleteModalProps) => {
    const modal = useSignal<HTMLDialogElement>();
    return (
      <div>
        <div onClick$={() => modal.value?.showModal()}>
          <Slot />
        </div>
        <dialog ref={modal} class="modal">
          <div class="modal-box flex max-w-xs flex-col p-0">
            <div class="flex flex-col gap-3 p-4">
              <h2 class="text-center text-lg font-semibold">{title}</h2>
              <p class="opacity-70" style={{ textWrap: "wrap" }}>
                {description}
              </p>
            </div>
            <div class="divider divider-vertical m-0 h-0"></div>
            <footer class="flex items-center justify-between gap-4">
              <button
                class="flex flex-1 justify-center p-3"
                onClick$={() => modal.value?.close()}
              >
                Cancel
              </button>
              <div class="divider divider-horizontal m-0"></div>
              <button
                class="flex flex-1 justify-center p-3 font-semibold text-error"
                onClick$={onDelete}
              >
                Delete
              </button>
            </footer>
          </div>

          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    );
  },
);

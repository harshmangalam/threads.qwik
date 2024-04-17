import { Slot, component$, useSignal } from "@builder.io/qwik";
import CloseIcon from "~/assets/icons/close.svg?jsx";
export const ImagePreview = component$(({ src }: { src: string }) => {
  const dialog = useSignal<HTMLDialogElement>();
  return (
    <>
      <button onClick$={() => dialog.value?.showModal()}>
        <Slot />
      </button>
      <dialog ref={dialog} class="modal bg-base-100">
        <div class="absolute left-6 top-6">
          <button class="btn btn-circle" onClick$={() => dialog.value?.close()}>
            <CloseIcon />
          </button>
        </div>
        <div class="modal-box flex items-center justify-center bg-transparent shadow-none">
          <div class="avatar">
            <div class="w-64 rounded-full">
              <img width={256} height={256} class="h-full w-full" src={src} />
            </div>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
});

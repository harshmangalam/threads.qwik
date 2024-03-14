import { component$, useSignal } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";

export const EditProfileModal = component$(() => {
  const modal = useSignal<HTMLDialogElement>();

  return (
    <div>
      <button
        class="btn btn-outline btn-sm btn-block"
        onClick$={() => modal.value?.showModal()}
      >
        Edit profile
      </button>

      <dialog ref={modal} class="modal">
        <div class="modal-box w-full max-w-xs">
          <Form onSubmitCompleted$={() => modal.value?.close()}>
            <div class="flex flex-col divide-y"></div>

            <button type="submit" class="btn btn-neutral btn-sm btn-block mt-4">
              Update
            </button>
          </Form>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
});

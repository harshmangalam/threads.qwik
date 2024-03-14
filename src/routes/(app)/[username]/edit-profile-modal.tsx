import { component$, useSignal } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import type { User } from "@prisma/client";
import { TextInput } from "~/components/ui/text-input";
import { useUpdateUserProfile } from "./layout";

const PrivateProfileSwitch = component$(({ checked }: { checked: boolean }) => {
  const input = useSignal(checked ? "on" : "off");
  return (
    <>
      <input type="hidden" name="private" value={input.value} />
      <div class="form-control py-2">
        <label class="label cursor-pointer">
          <span class="label-text font-semibold">Private profile</span>
          <input
            type="checkbox"
            class="toggle"
            name="private"
            checked={checked}
            value={input.value}
            onInput$={(e) => {
              const value = (e.target as HTMLInputElement).value;
              input.value = value === "on" ? "off" : "on";
            }}
          />
        </label>
      </div>
    </>
  );
});

export const EditProfileModal = component$(({ user }: { user: User }) => {
  const modal = useSignal<HTMLDialogElement>();
  const updateUserProfile = useUpdateUserProfile();

  return (
    <div>
      <button
        class="btn btn-outline btn-sm btn-block"
        onClick$={() => modal.value?.showModal()}
      >
        Edit profile
      </button>

      <dialog ref={modal} class="modal">
        <div class="modal-box w-full max-w-md">
          <Form
            action={updateUserProfile}
            onSubmitCompleted$={() => modal.value?.close()}
          >
            <input type="hidden" value={user.id} name="id" />
            <div class="flex flex-col gap-2">
              <TextInput
                sizes="input-sm"
                name="name"
                label="Name"
                value={user.name}
              />
              <TextInput
                sizes="input-sm"
                name="bio"
                label="Bio"
                value={user.bio}
              />
              <TextInput
                sizes="input-sm"
                name="link"
                label="Link"
                type="url"
                value={user.link}
              />
              <PrivateProfileSwitch checked={user.private} />
            </div>
            <button
              disabled={updateUserProfile.isRunning}
              type="submit"
              class="btn btn-neutral btn-sm btn-block mt-4"
            >
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

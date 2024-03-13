import { component$, useSignal } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useUpdateReplyPrivacy } from "~/shared/thread";

const Radio = component$(
  ({
    label,
    value,
    checked,
  }: {
    label: string;
    value: string;
    checked: boolean;
  }) => {
    return (
      <div class="form-control py-2">
        <label class="label cursor-pointer">
          <span class="label-text font-semibold">{label}</span>
          <input
            type="radio"
            name="replyPrivacy"
            class="radio radio-sm"
            value={value}
            checked={checked}
          />
        </label>
      </div>
    );
  },
);
export const EditReplyPrivacy = component$(
  ({ replyPrivacy, threadId }: { replyPrivacy: string; threadId: string }) => {
    const modal = useSignal<HTMLDialogElement>();
    const updateReplyPrivacy = useUpdateReplyPrivacy();
    const options = [
      {
        label: "Anyone",
        value: "ANYONE",
      },
      {
        label: "Profiles you follow",
        value: "FOLLOWING",
      },
      {
        label: "Mentioned only",
        value: "MENTION",
      },
    ];
    return (
      <div>
        <li>
          <button class="" onClick$={() => modal.value?.showModal()}>
            Who can reply
          </button>
        </li>
        <dialog ref={modal} class="modal">
          <div class="modal-box w-full max-w-xs">
            <Form
              action={updateReplyPrivacy}
              onSubmitCompleted$={() => modal.value?.close()}
            >
              <input type="hidden" name="threadId" value={threadId} />
              <div class="flex flex-col divide-y">
                {options.map((option) => (
                  <Radio
                    label={option.label}
                    value={option.value}
                    key={option.value}
                    checked={replyPrivacy === option.value}
                  />
                ))}
              </div>

              <button
                disabled={updateReplyPrivacy.isRunning}
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
  },
);

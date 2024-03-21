import { component$ } from "@builder.io/qwik";
import { useSaveThread } from "~/shared/thread";

export const SaveThread = component$(
  ({ threadId, isSaved }: { threadId: string; isSaved: boolean }) => {
    const saveThread = useSaveThread();
    return (
      <button onClick$={() => saveThread.submit({ threadId })}>
        {isSaved ? "Unsave" : "Save"}
      </button>
    );
  },
);

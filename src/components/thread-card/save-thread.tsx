import { component$ } from "@builder.io/qwik";
import { useSaveThread } from "~/shared/thread";

export const SaveThread = component$(({ threadId }: { threadId: string }) => {
  const saveThread = useSaveThread();
  return <button onClick$={() => saveThread.submit({ threadId })}>Save</button>;
});

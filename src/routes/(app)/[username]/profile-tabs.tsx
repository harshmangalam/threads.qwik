import { component$ } from "@builder.io/qwik";
import { TabLink } from "./tab-link";

export const ProfileTabs = component$(({ username }: { username: string }) => {
  return (
    <section class="mt-4">
      <div role="tablist" class="tabs tabs-bordered">
        <TabLink href={`/${username}/`}>Threads</TabLink>
        <TabLink href={`/${username}/replies/`}>Replies</TabLink>
        <TabLink href={`/${username}/reposts/`}>Reposts</TabLink>
      </div>
    </section>
  );
});

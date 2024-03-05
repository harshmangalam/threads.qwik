import { component$ } from "@builder.io/qwik";
import { TabLink } from "./tab-link";

export const ProfileTabs = component$(() => {
  return (
    <section class="mt-4">
      <div role="tablist" class="tabs tabs-bordered">
        <TabLink href={`/@harshmangalam/`}>Threads</TabLink>
        <TabLink href={`/@harshmangalam/replies/`}>Replies</TabLink>
        <TabLink href={`/@harshmangalam/reposts/`}>Reposts</TabLink>
      </div>
    </section>
  );
});

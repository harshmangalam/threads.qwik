import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "~/components/navbar";

export default component$(() => {
  return (
    <div>
      <Navbar />
      <main class="mx-auto max-w-[620px] px-6">
        <Slot />
      </main>
    </div>
  );
});

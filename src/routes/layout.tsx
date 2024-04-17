import { component$, Slot } from "@builder.io/qwik";
import "@fontsource-variable/open-sans/wght.css";

export default component$(() => {
  return (
    <div style={{ fontFamily: "Open Sans Variable, sans-serif" }}>
      <Slot />
    </div>
  );
});

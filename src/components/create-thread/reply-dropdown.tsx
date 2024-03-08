import { component$ } from "@builder.io/qwik";

export const ReplyDropdown = component$(() => {
  const options = [
    {
      label: "Anyone",
      value: "ANYONE",
    },
    {
      label: "Profiles you follow",
      value: "PROFILES_FOLLOW",
    },
    {
      label: "Mentioned only",
      value: "MENTIONED_ONLY",
    },
  ];
  return (
    <select class="select select-bordered select-sm w-full max-w-xs">
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {`${o.label} can reply`}
        </option>
      ))}
    </select>
  );
});

import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

type Props = QwikIntrinsicElements["input"] & {
  label?: string;
  error?: string | string[];
  bordered?: boolean;
  colorScheme?:
    | "input-primary"
    | "input-secondary"
    | "input-info"
    | "input-accent"
    | "input-success"
    | "input-warning"
    | "input-error";
  sizes?: "input-sm" | "input-md" | "input-lg";
};

export const TextInput = component$((props: Props) => {
  const {
    label,
    id,
    error,
    bordered = true,
    colorScheme = "",
    sizes = "input-md",
    ...rest
  } = props;
  return (
    <div class="form-control w-full">
      {label && (
        <label for={id} class="label">
          <span class="label-text">{label}</span>
        </label>
      )}
      <input
        id={id}
        class={[
          "input w-full",
          { "input-bordered": bordered },
          colorScheme,
          sizes,
        ]}
        {...rest}
      />
      {error && (
        <label class="label">
          <span class="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
});

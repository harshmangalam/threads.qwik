import { type QwikIntrinsicElements, component$ } from "@builder.io/qwik";

type RadioProps = QwikIntrinsicElements["input"] & {
  label: string;
};
export const Radio = component$(({ label, ...rest }: RadioProps) => {
  return (
    <div class="form-control py-2">
      <label class="label cursor-pointer">
        <span class="label-text font-semibold">{label}</span>
        <input type="radio" {...rest} />
      </label>
    </div>
  );
});

import { PropType, defineComponent } from "vue";
import s from "./Button.module.scss";

export const Button = defineComponent({
  props: {
    onclick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
    level: {
      type: String as PropType<"important" | "normal" | "danger">,
      default: "normal",
    },
    type: {
      type: String as PropType<"submit" | "button">,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props, context) => {
    return () => (
      <button
        type={props.type}
        class={[s.button, s[props.level]]}
        onClick={props.onclick}
        disabled={props.disabled}
      >
        {context.slots.default?.()}
      </button>
    );
  },
});

import { PropType, computed, defineComponent, ref } from "vue";
import s from "./Button.module.scss";

export const Button = defineComponent({
  props: {
    onClick: {
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
    autoSelfDisabled: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props, context) => {
    const selfFisabled = ref(false);
    const _disabled = computed(() => {
      if (props.autoSelfDisabled === false) {
        return props.disabled;
      }
      if (selfFisabled.value) {
        return true;
      } else {
        return props.disabled;
      }
    });
    const onClick = () => {
      props.onClick?.();
      selfFisabled.value = true;
      setTimeout(() => {
        selfFisabled.value = false;
      }, 500);
    };
    return () => (
      <button
        type={props.type}
        class={[s.button, s[props.level]]}
        onClick={onClick}
        disabled={_disabled.value}
      >
        {context.slots.default?.()}
      </button>
    );
  },
});

import { defineComponent, defineProps, PropType } from "vue";
import s from "./Icon.module.scss";

export type IconName =
  | "add"
  | "chart"
  | "clock"
  | "cloud"
  | "mangosteen"
  | "menu"
  | "charts"
  | "export"
  | "fen"
  | "notify"
  | "left"
  | "notes"
  | "date"
  | "bk"
  | "pig";

export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<IconName>,
      required: true,
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
  },
  setup: (props, context) => {
    return () => (
      <svg class={s.icon} onClick={props.onClick}>
        <use xlinkHref={"#" + props.name}></use>
      </svg>
    );
  },
});

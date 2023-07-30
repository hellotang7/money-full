import { defineComponent } from "vue";
import { Icon } from "./Icon";
import s from "./FloartButton.module.scss";
export const FloartButton = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.floatButton}>
        <Icon name="add" class={s.icon} />
      </div>
    );
  },
});

import { defineComponent, PropType, ref } from "vue";
import s from "./Charts.module.scss";
import { FormItem } from "../../shared/Form";
export const Charts = defineComponent({
  props: {
    starDate: {
      type: String as PropType<string>,
      required: true,
    },
    endDate: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup: (props, context) => {
    const category = ref("exoenses");

    return () => (
      <div class={s.wrapper}>
        <FormItem
          label="类型"
          type="select"
          v-model={category.value}
          options={[
            { value: "exoenses", text: "支出" },
            { value: "income", text: "收入" },
          ]}
        />
      </div>
    );
  },
});

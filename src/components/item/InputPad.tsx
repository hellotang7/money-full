import { defineComponent, PropType, ref } from "vue";
import s from "./InputPad.module.scss";
import { Icon } from "../../shared/Icon";
import { DatetimePicker, Popup } from "vant";
import { time } from "../../shared/time";

export const InputPad = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const buttons = [
      { text: "1", onClick: () => {} },
      { text: "2", onClick: () => {} },
      { text: "3", onClick: () => {} },
      { text: "删", onClick: () => {} },
      { text: "4", onClick: () => {} },
      { text: "5", onClick: () => {} },
      { text: "6", onClick: () => {} },
      { text: "+", onClick: () => {} },
      { text: "7", onClick: () => {} },
      { text: "8", onClick: () => {} },
      { text: "9", onClick: () => {} },
      { text: "-", onClick: () => {} },
      { text: ".", onClick: () => {} },
      { text: "0", onClick: () => {} },
      { text: "清空", onClick: () => {} },
      { text: "提交", onClick: () => {} },
    ];
    const refDate = ref<Date>();
    const refDatePickerVisible = ref(false);
    const showDatePicker = () => (refDatePickerVisible.value = true);
    const hideDatePicker = () => (refDatePickerVisible.value = false);
    const setDate = (date: Date) => {
      refDate.value = date;
      hideDatePicker();
    };

    return () => (
      <div class={s.wrapper}>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon name="date" class={s.icon} />

            <span onClick={showDatePicker}>{time(refDate.value).format()}</span>

            <Popup position="bottom" v-model:show={refDatePickerVisible.value}>
              <DatetimePicker
                type="date"
                value={refDate.value}
                title="选择年月日"
                onConfirm={setDate}
                onCancel={hideDatePicker}
              />
            </Popup>
          </span>
          <span class={s.amount}>￥199.122</span>
        </div>
        <div class={s.buttons}>
          {buttons.map((button) => (
            <button onClick={button.onClick}>{button.text}</button>
          ))}
        </div>
      </div>
    );
  },
});

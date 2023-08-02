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
    const refDate = ref<Date>();
    const refAmount = ref("0"); //现有的值
    const appendText = (n: number | string) => {
      const nString = n.toString(); //正在输入的值
      if (refAmount.value.length === 13) return; //最多13位

      if (refAmount.value.indexOf(".") >= 0 && nString === ".") return;

      if (refAmount.value.length - refAmount.value.indexOf(".") > 2) return;

      if (refAmount.value === "0") {
        if ("0123456789".indexOf(nString) >= 0) {
          refAmount.value = nString;
        } else {
          refAmount.value += nString;
        }
        return;
      }

      refAmount.value += nString;
    };

    const buttons = [
      {
        text: "1",
        onClick: () => {
          appendText(1);
        },
      },
      {
        text: "2",
        onClick: () => {
          appendText(2);
        },
      },
      {
        text: "3",
        onClick: () => {
          appendText(3);
        },
      },
      {
        text: "4",
        onClick: () => {
          appendText(4);
        },
      },
      {
        text: "5",
        onClick: () => {
          appendText(5);
        },
      },
      {
        text: "6",
        onClick: () => {
          appendText(6);
        },
      },
      {
        text: "7",
        onClick: () => {
          appendText(7);
        },
      },
      {
        text: "8",
        onClick: () => {
          appendText(8);
        },
      },
      {
        text: "9",
        onClick: () => {
          appendText(9);
        },
      },
      {
        text: ".",
        onClick: () => {
          appendText(".");
        },
      },
      {
        text: "0",
        onClick: () => {
          appendText(0);
        },
      },
      {
        text: <Icon name="bk" />,
        onClick: () => {
          refAmount.value = "0";
        },
      },
      { text: "提交", onClick: () => {} },
    ];

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
          <span class={s.amount}>￥{refAmount.value}</span>
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

import { defineComponent, PropType, ref } from "vue";
import s from "./InputPad.module.scss";
import { Icon } from "../../shared/Icon";
import { DatetimePicker, Popup } from "vant";
import { Time } from "../../shared/time";
import { RouterLink } from "vue-router";

export const InputPad = defineComponent({
  props: {
    happenAt: String,
    amount: Number,
    onSubmit: {
      type: Function as PropType<() => void>,
    },
  },
  // emits: ["update:happenAt"],
  setup: (props, context) => {
    const refAmount = ref(props.amount ? (props.amount / 100).toString() : "0"); //现有的值
    const appendText = (n: number | string) => {
      const nString = n.toString(); //正在输入的值
      const dotIndex = refAmount.value.indexOf(".");
      if (refAmount.value.length === 13) return; //最多13位

      if (refAmount.value.indexOf(".") >= 0 && nString === ".") return;

      if (dotIndex >= 0 && refAmount.value.length - dotIndex > 2) return;

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
      {
        text: "提交",
        onClick: () => {
          context.emit("update:amount", parseFloat(refAmount.value));
          props.onSubmit?.();
        },
      },
    ];

    const refDatePickerVisible = ref(false);
    const showDatePicker = () => (refDatePickerVisible.value = true);
    const hideDatePicker = () => (refDatePickerVisible.value = false);
    const setDate = (date: Date) => {
      context.emit("update:happenAt", date.toISOString());
      hideDatePicker();
    };

    return () => (
      <div class={s.wrapper}>
        <div class={s.dateAndAmount}>
          <span class={s.date}>

            <Icon name="date" class={s.icon} />

            <span onClick={showDatePicker}>
              {new Time(props.happenAt).format()}
            </span>

            <Popup position="bottom" v-model:show={refDatePickerVisible.value}>
              <DatetimePicker
                type="date"
                modelValue={props.happenAt ? new Date(props.happenAt):new Date()}
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

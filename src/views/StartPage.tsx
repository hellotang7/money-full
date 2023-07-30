import { defineComponent } from "vue";
import { Button } from "../shared/Button";
import s from "./StartPage.module.scss";
import { FloartButton } from "../shared/FloartButton";
import { Center } from "../shared/Center";
import { Icon } from "../shared/Icon";

export const StartPage = defineComponent({
  setup: (props, context) => {
    const onClick = () => {
      console.log("hi");
    };
    return () => (
      <div>
        <nav>menu</nav>
        <Center class={s.pig_wrapper}>
          <Icon class={s.pig} name="pig" />
        </Center>

        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>
            测试
          </Button>
        </div>
        <FloartButton iconName="add"></FloartButton>
      </div>
    );
  },
});

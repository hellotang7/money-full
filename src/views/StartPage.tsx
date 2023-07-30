import { defineComponent, ref } from "vue";
import { Button } from "../shared/Button";
import s from "./StartPage.module.scss";
import { FloartButton } from "../shared/FloartButton";
import { Center } from "../shared/Center";
import { Icon } from "../shared/Icon";
import { Navbar } from "../shared/Navbar";
import { Overlay } from "../shared/Overlay";

export const StartPage = defineComponent({
  setup: (props, context) => {
    const overlayVisble = ref(false);
    const onClickMenu = () => {
      overlayVisble.value = !overlayVisble.value;
    };
    return () => (
      <div>
        <Navbar>
          {{
            default: () => "山竹记账",
            icon: () => (
              <Icon name="menu" class={s.navIcon} onClick={onClickMenu} />
            ),
          }}
        </Navbar>
        <Center class={s.pig_wrapper}>
          <Icon name="pig"  class={s.pig}/>
        </Center>

        <div class={s.button_wrapper}>
          <Button class={s.button}>开始记账</Button>
        </div>
        <FloartButton iconName="add"></FloartButton>
        {overlayVisble.value && (
          <Overlay onClose={() => (overlayVisble.value = false)} />
        )}
      </div>
    );
  },
});

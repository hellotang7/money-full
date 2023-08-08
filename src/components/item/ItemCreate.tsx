import { defineComponent, onMounted, PropType, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import { RouterLink } from "vue-router";
import { http } from "../../shared/Http";
import { Button } from "../../shared/Button";
import { useTags } from "../../shared/useTags";
import { Tags } from "./Tags";

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refKind = ref("支出"); //默认支出
    const refTagId = ref<number>();
    const refHappenAt = ref<string>(new Date().toISOString());
    const refAmount = ref<number>(0);
    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => "记一笔",
          icon: () => (
            <RouterLink to="/items">
              <Icon name="left" class={s.navIcon} />
            </RouterLink>
          ),
          default: () => (
            <>
              <div class={s.wrapper}>
                <div>{refAmount.value}</div>
                <Tabs v-model:selected={refKind.value} class={s.tabs}>
                  <Tab name="支出" class={s.tags_wrapper}>
                    <Tags kind="expenses" v-model:selected={refTagId.value} />
                  </Tab>
                  <Tab name="收入" class={s.tags_wrapper}>
                    <Tags kind="income" v-model:selected={refTagId.value} />
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad
                    v-model:happenAt={refHappenAt.value}
                    v-model:amount={refAmount.value}
                  />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});

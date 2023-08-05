import { defineComponent, PropType, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import { RouterLink } from "vue-router";

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refKind = ref("支出");
    const refExpensesTags = ref([
      { id: 1, name: "餐费", sign: "￥", caregory: "expenses" },
      { id: 2, name: "打车", sign: "￥", caregory: "expenses" },
      { id: 3, name: "租房", sign: "￥", caregory: "expenses" },
      { id: 1, name: "餐费", sign: "￥", caregory: "expenses" },
      { id: 2, name: "打车", sign: "￥", caregory: "expenses" },
      { id: 3, name: "租房", sign: "￥", caregory: "expenses" },
      { id: 1, name: "餐费", sign: "￥", caregory: "expenses" },
      { id: 2, name: "打车", sign: "￥", caregory: "expenses" },
      { id: 3, name: "租房", sign: "￥", caregory: "expenses" },
      { id: 1, name: "餐费", sign: "￥", caregory: "expenses" },
      { id: 2, name: "打车", sign: "￥", caregory: "expenses" },
      { id: 3, name: "租房", sign: "￥", caregory: "expenses" },
      { id: 1, name: "餐费", sign: "￥", caregory: "expenses" },
      { id: 2, name: "打车", sign: "￥", caregory: "expenses" },
      { id: 3, name: "租房", sign: "￥", caregory: "expenses" },
      { id: 2, name: "打车", sign: "￥", caregory: "expenses" },
      { id: 3, name: "租房", sign: "￥", caregory: "expenses" },
      { id: 1, name: "餐费", sign: "￥", caregory: "expenses" },
      { id: 2, name: "打车", sign: "￥", caregory: "expenses" },
      { id: 3, name: "租房", sign: "￥", caregory: "expenses" },
      { id: 2, name: "打车", sign: "￥", caregory: "expenses" },
      { id: 3, name: "租房", sign: "￥", caregory: "expenses" },
      { id: 1, name: "餐费", sign: "￥", caregory: "expenses" },
      { id: 2, name: "打车", sign: "￥", caregory: "expenses" },
      { id: 3, name: "租房", sign: "￥", caregory: "expenses" },
      { id: 2, name: "打车", sign: "￥", caregory: "expenses" },
      { id: 3, name: "租房", sign: "￥", caregory: "expenses" },
      { id: 1, name: "餐费", sign: "￥", caregory: "expenses" },
      { id: 2, name: "打车", sign: "￥", caregory: "expenses" },
      { id: 3, name: "租房", sign: "￥", caregory: "expenses" },
      { id: 2, name: "打车", sign: "￥", caregory: "expenses" },
      { id: 3, name: "租房", sign: "￥", caregory: "expenses" },
      { id: 1, name: "餐费", sign: "￥", caregory: "expenses" },
      { id: 2, name: "打车", sign: "￥", caregory: "expenses" },
      { id: 3, name: "租房", sign: "￥", caregory: "expenses" },
      { id: 2, name: "打车", sign: "￥", caregory: "expenses" },
      { id: 3, name: "租房", sign: "￥", caregory: "expenses" },
      { id: 1, name: "餐费", sign: "￥", caregory: "expenses" },
      { id: 2, name: "打车", sign: "￥", caregory: "expenses" },
      { id: 3, name: "租房", sign: "￥", caregory: "expenses" },
      { id: 2, name: "打车", sign: "￥", caregory: "expenses" },
      { id: 3, name: "租房", sign: "￥", caregory: "expenses" },
      { id: 1, name: "餐费", sign: "￥", caregory: "expenses" },
      { id: 2, name: "打车", sign: "￥", caregory: "expenses" },
      { id: 3, name: "租房", sign: "￥", caregory: "expenses" },
    ]);
    const refIncomeTags = ref([
      { id: 4, name: "工资", sign: "￥", caregory: "income" },
      { id: 5, name: "发传单", sign: "￥", caregory: "income" },
      { id: 6, name: "诈骗", sign: "￥", caregory: "income" },
      { id: 4, name: "工资", sign: "￥", caregory: "income" },
      { id: 5, name: "发传单", sign: "￥", caregory: "income" },
      { id: 6, name: "诈骗", sign: "￥", caregory: "income" },
      { id: 4, name: "工资", sign: "￥", caregory: "income" },
      { id: 5, name: "发传单", sign: "￥", caregory: "income" },
      { id: 6, name: "诈骗", sign: "￥", caregory: "income" },
      { id: 4, name: "工资", sign: "￥", caregory: "income" },
      { id: 5, name: "发传单", sign: "￥", caregory: "income" },
      { id: 6, name: "诈骗", sign: "￥", caregory: "income" },
      { id: 4, name: "工资", sign: "￥", caregory: "income" },
      { id: 5, name: "发传单", sign: "￥", caregory: "income" },
      { id: 6, name: "诈骗", sign: "￥", caregory: "income" },
    ]);
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
                <Tabs v-model:selected={refKind.value} class={s.tabs}>
                  <Tab name="支出" class={s.tags_wrapper}>
                    {refExpensesTags.value.map((tag) => (
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>
                  </Tab>
                  <Tab name="收入" class={s.tags_wrapper}>
                    {refIncomeTags.value.map((tag) => (
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});

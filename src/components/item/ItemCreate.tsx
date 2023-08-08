import { defineComponent, onMounted, PropType, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import { RouterLink } from "vue-router";
import { http } from "../../shared/Http";
import { Button } from "../../shared/Button";

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refKind = ref("支出"); //默认支出
    const refPage = ref(0); //当前第几页
    const refHasMore = ref(false); //默认没有更多
    onMounted(async () => {
      const response = await http.get<Resources<Tag>>("tags", {
        kind: "expenses",
        _mock: "tagIndex",
      });
      const { resources, pager } = response.data;
      refExpensesTags.value = resources; //获取支出标签
      //判断是否需要加载下一页
      refHasMore.value =
        (pager.page - 1) * pager.per_page + resources.length < pager.count;
      // console.log(refHasMore.value);
    });

    onMounted(async () => {
      const response = await http.get<{ resources: Tag[] }>("tags", {
        kind: "income",
        _mock: "tagIndex",
      });
      refIncomeTags.value = response.data.resources; //获取收入标签
    });
    const refExpensesTags = ref<Tag[]>([]);
    const refIncomeTags = ref<Tag[]>([]);

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
                    <div>
                      <div class={s.tag}>
                        <div class={s.sign}>
                          <Icon name="add" class={s.createTag} />
                        </div>
                        <div class={s.name}>新增</div>
                      </div>
                      <div class={s.more}>
                        {refHasMore.value ? (
                          <Button class={s.loadMore}>加载更多</Button>
                        ) : (
                          <span class={s.loadMore}>没有更多了</span>
                        )}
                      </div>
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

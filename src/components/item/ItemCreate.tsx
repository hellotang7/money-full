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

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refKind = ref("支出"); //默认支出
    // const refIncomeTags = ref<Tag[]>([]); //收入标签

    const {
      tags: expensesTags,
      hasMore,
      ferchTags,
    } = useTags((page) => {
      return http.get<Resources<Tag>>("tags", {
        kind: "expenses",
        page: page + 1,
        _mock: "tagIndex",
      });
    });
    const {
      tags: incomeTags,
      hasMore: hasMore2,
      ferchTags: fachTags2,
    } = useTags((page) => {
      return http.get<Resources<Tag>>("tags", {
        kind: "income",
        page: page + 1,
        _mock: "tagIndex",
      });
    });

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
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>

                    {expensesTags.value.map((tag) => (
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}

                    <div class={s.more}>
                      {hasMore.value ? (
                        <Button onClick={ferchTags} class={s.loadMore}>
                          加载更多
                        </Button>
                      ) : (
                        <span class={s.loadMore}>没有更多了</span>
                      )}
                    </div>
                  </Tab>
                  <Tab name="收入" class={s.tags_wrapper}>
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>

                    {incomeTags.value.map((tag) => (
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}

                    <div class={s.more}>
                      {hasMore2.value ? (
                        <Button onClick={fachTags2} class={s.loadMore}>
                          加载更多
                        </Button>
                      ) : (
                        <span class={s.loadMore}>没有更多了</span>
                      )}
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

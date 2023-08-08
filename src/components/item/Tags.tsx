import { defineComponent, onUnmounted, PropType } from "vue";
import s from "./Tags.module.scss";
import { http } from "../../shared/Http";
import { useTags } from "../../shared/useTags";
import { Icon } from "../../shared/Icon";
import { Button } from "../../shared/Button";
export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<string>,
      required: true,
    },
    selected: Number,
  },
  emits: ["update:selected"],
  setup: (props, context) => {
    const { tags, hasMore, ferchTags } = useTags((page) => {
      return http.get<Resources<Tag>>("tags", {
        kind: props.kind,
        page: page + 1,
        _mock: "tagIndex",
      });
    });
    const onSelect = (tag: Tag) => {
      context.emit("update:selected", tag.id);
    };
    return () => (
      <>
        <div class={s.tag}>
          <div class={s.sign}>
            <Icon name="add" class={s.createTag} />
          </div>
          <div class={s.name}>新增</div>
        </div>

        {tags.value.map((tag) => (
          <div
            class={[s.tag, props.selected === tag.id ? s.selected : ""]}
            onClick={() => onSelect(tag)}
          >
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
      </>
    );
  },
});

import { defineComponent } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { TagForm } from "./TagForm";
import { Button } from "../../shared/Button";
import s from "./Tag.module.scss";
import { BackIcon } from "../../shared/BackIcon";
import { useRoute, useRouter } from "vue-router";
import { Dialog } from "vant";
import { http } from "../../shared/Http";

export const TagEdit = defineComponent({
  setup: (props, context) => {
    const route = useRoute();
    const numberId = parseInt(route.params.id!.toString());
    if (Number.isNaN(numberId)) {
      return () => <div>id 不存在</div>;
    }
    const router = useRouter();
    const onDelete = async (options?: { withItems?: boolean }) => {
      await Dialog.confirm({
        message: "删除后无法恢复，是否删除？",
      }).then(async () => {
        await http
            .delete(`/tags/${numberId}`, {
              withItems: options?.withItems ? 'true' : 'false',
            }, {_autoLoading: true})

      });
      router.back();
    };
    return () => (
      <MainLayout disabled={false}>
        {{
          title: () => "编辑标签",
          icon: () => <BackIcon class={s.backIcon}/>,
          default: () => (
            <>
              <TagForm id={numberId} />
              <div class={s.actions}>
                <Button
                  level="danger"
                  class={s.removeTagsAndItems}
                  onClick={() => onDelete({ withItems: true })}
                >
                  删除标签
                </Button>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});

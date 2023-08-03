import { defineComponent, PropType, ref } from "vue";
import { RouterLink } from "vue-router";
import s from "./Overlay.module.scss";
import { Icon } from "./Icon";

export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>,
    },
  },
  setup: (props, context) => {
    const close = () => {
      props.onClose?.();
    };
    const onClickSignIn = () => {};
    return () => (
      <>
        <div class={s.mask} onClick={close}></div>
        <div class={s.overlay}>
          <section class={s.currentUser} onClick={onClickSignIn}>
            <h2>未登录用户</h2>
            <p>点击这里登录</p>
          </section>
          <nav>
            <ul class={s.action_list}>
              <li>
                <RouterLink to="/statistics" class={s.action}>
                  <Icon name="charts" class={s.icon} />
                  <span>统计图表</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/export" class={s.action}>
                  <Icon name="export"></Icon>
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/fen" class={s.action}>
                  <Icon name="fen"></Icon>
                  <span>自定义分类</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/notify" class={s.action}>
                  <Icon name="notify"></Icon>
                  <span>记账提醒</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  },
});

export const OverlayIcon = defineComponent({
  setup: (props, context) => {
    const overlayVisble = ref(false);
    const onClickMenu = () => {
      overlayVisble.value = !overlayVisble.value;
    };
    return () => (
      <>
        <Icon name="menu" class={s.icon} onClick={onClickMenu} />
        {overlayVisble.value && (
          <Overlay onClose={() => (overlayVisble.value = false)} />
        )}
      </>
    );
  },
});

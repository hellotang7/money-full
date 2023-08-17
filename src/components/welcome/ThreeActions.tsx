import s from "./welcome.module.scss";
import { RouterLink } from "vue-router";
import { FunctionalComponent } from "vue";
import { SkipFeatures } from "../../shared/Button";
export const ThreeActions: FunctionalComponent = () => {
  return (
    <div class={s.actions}>
      <RouterLink to="/welcome/4" class={s.button}>下一页</RouterLink>
      <SkipFeatures />
    </div>
  );
};

ThreeActions.displayName = "ThreeActions";

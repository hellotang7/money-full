import s from "./welcome.module.scss";
import { RouterLink } from "vue-router";
import { FunctionalComponent } from "vue";
import { SkipFeatures } from "../../shared/Button";
export const OneActions: FunctionalComponent = () => {
  return (
    <div class={s.actions}>
      <RouterLink class={s.button} to="/welcome/2">下一页</RouterLink>
      <SkipFeatures />
    </div>
  );
};

OneActions.displayName = "OneActions";

import s from "./welcome.module.scss";
import { RouterLink } from "vue-router";
import { FunctionalComponent } from "vue";
import { SkipFeatures } from "../../shared/Button";
export const TwoActions: FunctionalComponent = () => {
  return (
    <div class={s.actions}>
      <SkipFeatures class={s.fake} />

      <RouterLink to="/welcome/3">下一页</RouterLink>
      <SkipFeatures />
    </div>
  );
};

TwoActions.displayName = "TwoActions";

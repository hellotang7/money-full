import { SkipFeatures } from "../../shared/Button";
import s from "./welcome.module.scss";
import { RouterLink } from "vue-router";
const onClick = () => {
  localStorage.setItem("skipFeatures", "yes");
};
export const FourActions = () => (
  <div class={s.actions}>


      <RouterLink to="/items" class={s.button}>开始记账</RouterLink>
      <SkipFeatures class={s.fake}/>

  </div>
);

FourActions.displayName = "FourActions";

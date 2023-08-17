import { SkipFeatures } from "../../shared/Button";
import s from "./welcome.module.scss";
import { RouterLink } from "vue-router";
const onClick = () => {
  localStorage.setItem("skipFeatures", "yes");
};
export const FourActions = () => (
  <div class={s.actions}>
    <span onClick={onClick}  class={s.button}>
      <RouterLink to="/start">完成</RouterLink>
    </span>
      <SkipFeatures class={s.fake}/>

  </div>
);

FourActions.displayName = "FourActions";

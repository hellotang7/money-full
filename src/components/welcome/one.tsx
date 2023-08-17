import s from "./welcome.module.scss";
import { FunctionalComponent } from "vue";

export const One: FunctionalComponent = () => {
  return (
    <div class={s.card}>
      <svg>
        <use xlinkHref="#pig"></use>
      </svg>
      <h2>
        会挣钱
        <br />
        还要会省钱
      </h2>
        <p>收入支出记载功能，助您更"省"一步</p>
    </div>
  );
};
One.displayName = "One";

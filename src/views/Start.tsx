import { defineComponent,PropType } from 'vue';
import s from './Start.module.scss';
import {Icon} from '../shared/Icon';
import {RouterLink} from 'vue-router';
import {Button} from '../shared/Button';

export const Start = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },

  setup: (props, context) => {
      const onClick = () => {
          localStorage.setItem("skipFeatures", "yes");
      };
    return () => (
        <div class={s.wrapper}>
            <Icon name="record" class={s.icon}/>
            <div class={s.main}>
              <span>
              <h1>聚沙成塔,集腋成裘, 集金成富 </h1>
              <h1>—— 集金记账</h1>
              </span>
              <RouterLink to="/items/create">
                <Button onClick={onClick} class={s.button}>开始记账</Button>
              </RouterLink>

            </div>

        </div>
    );
  }
});

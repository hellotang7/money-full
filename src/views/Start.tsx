import { defineComponent,PropType } from 'vue';
import s from './Start.module.scss';
import {Center} from '../shared/Center';
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
    return () => (
        <div class={s.wrapper}>
            <Icon name="pig" class={s.pig}/>
            <div class={s.main_wrapper}>
              <div>
              <h1>聚沙成塔,集腋成裘, 集金成富 </h1>
              <h1>—— 集金记账</h1>
              </div>
              <RouterLink to="/items/create">
                <Button class={s.button}>开始记账</Button>
              </RouterLink>

            </div>

        </div>
    );
  }
});

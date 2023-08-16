import { defineComponent,PropType } from 'vue';
import s from './Buttombar.module.scss';
import {Icon} from './Icon';
import {RouterLink} from 'vue-router';

export const Buttombar = defineComponent({


  setup: (props, context) => {
    return () => (
        <div class={s.action_list}>
                    <RouterLink to="/items" class={s.action} activeClass={s.activeClass}>
                        <Icon name="home" class={s.icon}/>
                    </RouterLink>
                    <RouterLink to="/statistics" class={s.action} activeClass={s.activeClass}>
                        <Icon name="statistics" class={s.icon} />
                    </RouterLink>
                    <RouterLink to={'/items/create'} class={s.action} activeClass={s.activeClass}>
                        <Icon name="add" class={s.icon}/>
                    </RouterLink>
                    <RouterLink to="/export" class={s.action} activeClass={s.activeClass}>
                        <Icon name="export" class={s.icon}></Icon>
                    </RouterLink>
                    <RouterLink to="/user" class={s.action} activeClass={s.activeClass}>
                        <Icon name="user" class={s.icon}></Icon>
                    </RouterLink>
        </div>
    );
  }
});

import {defineComponent, PropType} from 'vue';
import {Navbar} from '../shared/Navbar';
import s from './MainLayout.module.scss';
import {Buttombar} from '../shared/Buttombar';

export const MainLayout = defineComponent({
    props: {
        disabled: {
            type: Boolean,
            default: true,
          }
    },
    setup: (props, context) => {
        return () => (
            <div class={s.wrapper}>
                <Navbar class={s.navbar}>
                    {{
                        default: () => context.slots.title?.(),
                        icon: () => context.slots.icon?.(),
                    }}
                </Navbar>
                {context.slots.default?.()}
                {props.disabled && <Buttombar/>}

            </div>
        );
    },
});

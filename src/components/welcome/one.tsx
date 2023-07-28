import {defineComponent} from 'vue';
import s from './One.module.scss';
import pig from '../../assets/icon/pig.svg';
import {RouterLink} from 'vue-router';
import {WelcomeLayout} from './WelcomeLayout';

export const One = defineComponent({
    setup: (props, context) => {
        return () => (
            <WelcomeLayout>
                {{
                    icon:()=> <img src={pig}/>,
                    title:()=> <h2>会挣钱<br/>还会省钱</h2>,
                    buttons:()=> <>
                        <RouterLink class={s.fake} to="/start">跳过</RouterLink>
                        <RouterLink to="/welcome/3">下一页</RouterLink>
                        <RouterLink class={s.next} to="/start">跳过</RouterLink>
                    </>
                }}
            </WelcomeLayout>
        );
    }
});

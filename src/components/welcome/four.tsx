import {defineComponent} from 'vue';
import s from './One.module.scss';
import cloud from '../../assets/icon/cloud.svg';

import {RouterLink} from 'vue-router';
import {WelcomeLayout} from './WelcomeLayout';

export const Four = defineComponent({
    setup: (props, context) => {
        return () => (
            <WelcomeLayout >
                {{
                    icon:()=> <img src={cloud}/>,
                    title:()=> <h2>会挣钱<br/>还会省钱</h2>,
                    buttons:()=> <>
                        <RouterLink class={s.fake} to="/start">跳过</RouterLink>
                        <RouterLink to="/start">完成</RouterLink>
                        <RouterLink class={s.fake} to="/start">跳过</RouterLink>
                    </>
                }}
            </WelcomeLayout>
        );
    }
});

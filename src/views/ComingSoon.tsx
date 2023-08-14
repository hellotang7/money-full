import { defineComponent,PropType } from 'vue';
import s from './ComingSoon.module.scss';
import {Center} from '../shared/Center';
import {Icon} from '../shared/Icon';
import {OverlayIcon} from '../shared/Overlay';
import {RouterLink} from 'vue-router';
import {Button} from '../shared/Button';
import {FloartButton} from '../shared/FloartButton';
import {MainLayout} from '../layouts/MainLayout';

export const ComingSoon = defineComponent({

  setup: (props, context) => {
    return () => (

            <MainLayout>
                {{
                    title: () => '山竹记账',
                    icon: () => <OverlayIcon/>,
                    default: () => (
                        <>
                            <Center class={s.pig_wrapper}>
                                <Icon name="pig" class={s.pig}/>
                            </Center>
                            <p class={s.text}>敬请期待</p>
                        </>
                    ),
                }}
            </MainLayout>
    );
  }
});

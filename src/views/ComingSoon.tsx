import { defineComponent,PropType } from 'vue';
import s from './ComingSoon.module.scss';
import {Center} from '../shared/Center';
import {Icon} from '../shared/Icon';

import {MainLayout} from '../layouts/MainLayout';

export const ComingSoon = defineComponent({

  setup: (props, context) => {
    return () => (

            <MainLayout>
                {{

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

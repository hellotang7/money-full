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

                            <div class={s.pig_wrapper}>
                                <Icon name="construction" class={s.pig}/>
                                <p class={s.text}>敬请期待</p>
                            </div>


                    ),
                }}
            </MainLayout>
    );
  }
});

import {defineComponent, onMounted, ref} from 'vue';
import s from './User.module.scss';
import {MainLayout} from '../layouts/MainLayout';
import {useMeStore} from '../stores/useMeStore';
import { useRoute, useRouter} from 'vue-router';
import {Dialog} from 'vant';
import {Button} from '../shared/Button';
import {Icon} from '../shared/Icon';

export const User = defineComponent({


    setup: (props, context) => {
        const meStore = useMeStore();
        const close = () => {
            props.onClose?.();
        };
        const route = useRoute();
        const router = useRouter();
        const me = ref<User>();
        const onClick = () => {
            Dialog.confirm({
                title: '确认',
                message: '你真的要退出登录吗'
            }).then( async () => {
                await localStorage.removeItem('jwt');


                await router.push('/start')

                await window.location.reload()



            });


        };
        onMounted(async () => {
            const response = await meStore.mePromise;
            me.value = response?.data.resource;
        });
        return () => (
            <MainLayout>
                {{
                    title: () => '个人中心',
                    default: () => (
                        <>
                            <section class={s.overlay}>
                                <div class={s.userIcon}>
                                    <Icon name="user" class={s.icon}></Icon>
                                </div>
                                <div class={s.userCurrent}>
                                    <h2>{me.value?.email}</h2>
                                    <p>欢迎用户</p>
                                    <Button class={s.button} onClick={onClick}>退出登录</Button>
                                </div>


                            </section>

                        </>
                    ),
                }}
            </MainLayout>
        );
    }
});

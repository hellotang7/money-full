import {defineComponent, onMounted, PropType, ref} from 'vue';
import {RouterLink, useRoute, useRouter} from 'vue-router';
import s from './Overlay.module.scss';
import {Icon} from './Icon';
import {mePromise} from './me';
import {Dialog} from 'vant';

export const Overlay = defineComponent({
    props: {
        onClose: {
            type: Function as PropType<() => void>,
        },
    },
    setup: (props, context) => {
        const close = () => {
            props.onClose?.();
        };
        const route = useRoute();
        const router = useRouter();
        const me = ref<User>();
        const onClick = () => {
          Dialog.confirm({
            title:'确认',
            message:'你真的要退出登录吗'
          }).then(()=>{
            localStorage.removeItem('jwt');
            router.push('sign_in')
          })

        };
        onMounted(async () => {
            const response = await mePromise;
            me.value = response?.data.resource;
        });
        return () => (
            <>
                <div class={s.mask} onClick={close}></div>
                <div class={s.overlay}>
                    <section class={s.currentUser}>
                        {me.value ?
                            <div>
                                <h2>{me.value?.email.substring(0, me.value?.email.indexOf('@'))}</h2>
                                <p onClick={onClick}>点击这里注销</p>
                            </div> :
                            <RouterLink to={`/sign_in?return_to${route.fullPath}`}>
                                <h2>未登录用户</h2>
                                <p>点击这里登录</p>
                            </RouterLink>}

                    </section>
                    <nav>
                        <ul class={s.action_list}>
                            <li>
                                <RouterLink to="/items" class={s.action}>
                                    <Icon name="mangosteen" class={s.icon}/>
                                    <span>首页</span>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/statistics" class={s.action}>
                                    <Icon name="charts" class={s.icon}/>
                                    <span>统计图表</span>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/export" class={s.action}>
                                    <Icon name="export" class={s.icon}></Icon>
                                    <span>导出数据</span>
                                </RouterLink>
                            </li>


                        </ul>
                    </nav>
                </div>
            </>
        );
    },
});

export const OverlayIcon = defineComponent({
    setup: (props, context) => {
        const overlayVisble = ref(false);
        const onClickMenu = () => {
            overlayVisble.value = !overlayVisble.value;
        };
        return () => (
            <>
                <Icon name="menu" class={s.iconMenu} onClick={onClickMenu}/>
                {overlayVisble.value && (
                    <Overlay onClose={() => (overlayVisble.value = false)}/>
                )}
            </>
        );
    },
});

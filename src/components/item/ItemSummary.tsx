import {defineComponent, onMounted, PropType, reactive, ref, watch} from 'vue';
import s from './ItemSummary.module.scss';
import {FloartButton} from '../../shared/FloartButton';
import {Button} from '../../shared/Button';
import {http} from '../../shared/Http';
import {Money} from '../../shared/Money';
import {Datetime} from '../../shared/Datetime';
import {Center} from '../../shared/Center';
import {Icon} from '../../shared/Icon';
import {RouterLink} from 'vue-router';

export const ItemSummary = defineComponent({
    props: {
        startDate: {
            type: String as PropType<string>,
            required: false,
        },
        endDate: {
            type: String as PropType<string>,
            required: false,
        },
    },
    setup: (props, context) => {
        const items = ref<Item[]>([]);
        const hasMore = ref(false);
        const page = ref(0);
        const itemsBalance = reactive({
            expenses: 0, income: 0, balance: 0
        });


        const fetchItems = async () => {
            if (!props.startDate || !props.endDate) {
                return;
            }
            const response = await http.get<Resource<Item>>('/items', {
                happen_after: props.startDate,
                happen_before: props.endDate,
                page: page.value + 1,

            },{_mock: 'itemIndex',_autoLoading:true});
            const {resources, pager} = response.data;
            items.value?.push(...resources);
            hasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count;
            page.value += 1;
        };
        onMounted(fetchItems);
        const fetchItemBalance = async () => {
            if (!props.startDate || !props.endDate) {
                return;
            }
            const response = await http.get('/items/balance', {
                happen_after: props.startDate,
                happen_before: props.endDate,
                page: page.value + 1,

            },{_mock: 'itemIndexBalance',_autoLoading:true});
            Object.assign(itemsBalance, response.data);
        };
        onMounted(fetchItemBalance);

        watch(() => [props.startDate, props.endDate], () => {
            items.value = [];
            hasMore.value = false;
            page.value = 0;
            Object.assign(itemsBalance, {
                expenses: 0, income: 0, balance: 0
            });
            fetchItems();
            fetchItemBalance();
        });


        return () => (
            <div class={s.wrapper}>
                {
                    (items.value && items.value.length > 0)
                    ?
                    (<>
                    <ul class={s.total}>
                        <li>
                            <span>收入</span>
                            <span>+{itemsBalance.income}</span>
                        </li>
                        <li>
                            <span>支出</span>
                            <span>-{itemsBalance.expenses}</span>
                        </li>
                        <li>
                            <span>净收入</span>
                            <span>+{itemsBalance.balance}</span>
                        </li>
                    </ul>
                    <ol class={s.list}>
                        {items.value.map((item) => (
                            <li>
                                <div class={s.sign}>
                                    <span>{item.tags![0].sign}</span>
                                </div>
                                <div class={s.text}>
                                    <div class={s.tagAndAmount}>
                                        <span class={s.tag}>{item.tags![0].name}</span>
                                        <span class={s.amount}>￥<Money value={item.amount}/></span>
                                    </div>
                                    <div class={s.time}><Datetime value={item.happened_at}/></div>
                                </div>
                            </li>
                        ))}
                    </ol>
                    <div class={s.more}>
                        {hasMore.value
                            ? <Button onClick={fetchItems}>加载更多</Button>
                            : <span>没有更多了</span>}
                    </div>
                        <FloartButton iconName="add"/>
                </>)
                    :
                    <> <Center class={s.pig_wrapper}>
                           <Icon name="pig" class={s.pig}/>
                         </Center>
                        <div class={s.button_wrapper}>
                            <p class={s.text}>没有发现账单哦，请试着记一笔~</p>
                            <RouterLink to="/items/create">
                                <Button class={s.button}>记一笔</Button>
                            </RouterLink>
                        </div>
                    </>
                }

            </div>
        );
    },
});

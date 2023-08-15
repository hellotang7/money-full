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
import {Dialog,SwipeCell} from 'vant';

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

        const fetchItems = async () => {
            if (!props.startDate || !props.endDate) {return;}
            const response = await http.get<Resources<Item>>('/items', {
                happen_after: props.startDate,
                happen_before: props.endDate,
                page: page.value + 1,

            },{_mock: 'itemIndex',_autoLoading:true});
            const { resources, pager } = response.data
            items.value?.push(...resources)
            hasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
            page.value += 1
        };
        onMounted(fetchItems);

        watch(()=>[props.startDate,props.endDate], ()=>{
            items.value = []
            hasMore.value = false
            page.value = 0
            fetchItems()
        })

        const fetchItemsBalance = async () => {
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

        const itemsBalance = reactive({
            expenses: 0, income: 0, balance: 0
        });

        onMounted(fetchItemsBalance);
        watch(()=>[props.startDate,props.endDate], ()=>{
            Object.assign(itemsBalance, {
                expenses: 0, income: 0, balance: 0
            })
            fetchItemsBalance()
        })




        const timer = ref<number>();
        const currentTag = ref<HTMLDivElement>();
        const onLongPress =  (id: number) => {
            Dialog.confirm({
                message: "删除后无法恢复，是否删除？",
            }).then( async ()=>{
                console.log(111);
                await http.delete(`/items/${id}`, {}, {})
                // fetchItems()
            })


        }

        const onTouchStart = (e: TouchEvent, item: Item) => {
            currentTag.value = e.currentTarget as HTMLDivElement;
            timer.value = setTimeout(() => {
                onLongPress(item.id);
            }, 500);
        };
        const onTouchEnd = (e: TouchEvent) => {
            clearTimeout(timer.value);
        };

        const onTouchMove = (e: TouchEvent) => {
            const pointedElement = document.elementFromPoint(
                e.touches[0].clientX,
                e.touches[0].clientY
            );
            if (
                currentTag.value?.contains(pointedElement) === false &&
                currentTag.value !== pointedElement
            ) {
                clearTimeout(timer.value);
            }
        };

        return () => (
            <div class={s.wrapper}>
                {
                    (items.value && items.value.length > 0)
                    ?
                    (<>
                    <ul class={s.total}>
                        <li>
                            <span>支出</span>
                            <span>-{itemsBalance.expenses}</span>
                        </li>
                        <li>
                            <span>收入</span>
                            <span>+{itemsBalance.income}</span>
                        </li>
                        <li>
                            <span>净收入</span>
                            <span>{itemsBalance.balance}</span>
                        </li>
                    </ul>
                    <ol class={s.list}>
                        {items.value.map((item) => (


                            <li onTouchend={onTouchEnd} onTouchmove={onTouchMove}  onTouchstart={(e) => onTouchStart(e, item)}>


                                <div class={s.sign}>
                                    <span>{item.tags && item.tags.length > 0 ? item.tags[0].sign : '💰'}</span>
                                </div>
                                <div class={s.text}>
                                    <div class={s.tagAndAmount}>
                                        <span
                                            class={s.tag}>{item.tags && item.tags.length > 0 ? item.tags[0].name : '未分类'}</span>
                                        {item.kind === 'expenses'
                                            ?<span class={s.amount}>- <Money value={item.amount}/></span>
                                            :<span class={s.amountIncome}>+ <Money value={item.amount}/></span>}

                                    </div>
                                    <div class={s.time}><Datetime value={item.happen_at}/></div>
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

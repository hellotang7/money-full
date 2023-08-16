import {defineComponent, onMounted, PropType, reactive, ref, watch} from 'vue';
import s from './ItemSummary.module.scss';
import {Button} from '../../shared/Button';
import {http} from '../../shared/Http';
import {Money} from '../../shared/Money';
import {Datetime} from '../../shared/Datetime';

import {Dialog,SwipeCell} from 'vant';
import {useAfterMe} from '../../hooks/useAfterMe';
import {useItemStore} from '../../stores/useItemStore';

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

        if (!props.startDate || !props.endDate) {
            return () => <div>请先选择时间范围</div>
        }
        const itemStore = useItemStore(['items', props.startDate, props.endDate])
        useAfterMe(() => itemStore.fetchItems(props.startDate, props.endDate))


        watch(
            () => [props.startDate, props.endDate],
            () => {
                itemStore.$reset()
                itemStore.fetchItems()
            }
        )


        const itemsBalance = reactive({
            expenses: 0, income: 0, balance: 0
        });

        const fetchItemsBalance = async () => {
                if (!props.startDate || !props.endDate) {
                    return
                }
                const response = await http.get(
                    '/items/balance',
                    {
                        happen_after: props.startDate,
                        happen_before: props.endDate
                    },
                    {
                        _mock: 'itemIndexBalance'
                    }
                )
            Object.assign(itemsBalance, response.data)
        }


        useAfterMe(fetchItemsBalance)

        watch(
            () => [props.startDate, props.endDate],
            () => {
                Object.assign(itemsBalance, {
                    expenses: 0,
                    income: 0,
                    balance: 0
                })
                fetchItemsBalance()
            }
        )




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
                    (itemStore.items && itemStore.items.length > 0)
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
                            <span>{itemsBalance.balance}</span>
                        </li>
                    </ul>
                        <div class={s.statistics_wrapper}>
                            <div class={s.statistics}></div>
                            <ol class={s.list}>
                                {itemStore.items.map((item) => (


                                    <li onTouchend={onTouchEnd} onTouchmove={onTouchMove}
                                        onTouchstart={(e) => onTouchStart(e, item)}>


                                        <div class={s.sign}>
                                            <span>{item.tags && item.tags.length > 0 ? item.tags[0].sign : '💰'}</span>
                                        </div>
                                        <div class={s.text}>
                                            <div class={s.tagAndAmount}>
                                        <span
                                            class={s.tag}>{item.tags && item.tags.length > 0 ? item.tags[0].name : '未分类'}</span>
                                                {item.kind === 'expenses'
                                                    ? <span class={s.amountExpenses}>- <Money value={item.amount}/></span>
                                                    :
                                                    <span class={s.amountIncome}>+ <Money value={item.amount}/></span>}

                                            </div>
                                            <div class={s.time}><Datetime value={item.happen_at}/></div>
                                        </div>
                                    </li>
                                ))}
                                <div class={s.more}>
                                    {itemStore.hasMore
                                        ? <Button
                                            onClick={() => itemStore.fetchNextPage(props.startDate, props.endDate)}>加载更多</Button>
                                        : <span>没有更多了</span>}
                                </div>
                            </ol>
                        </div>


                </>)
                    :

                            <p class={s.msg_text}>没有发现账单哦，请试着记一笔~</p>


                }

            </div>
        );
    },
});

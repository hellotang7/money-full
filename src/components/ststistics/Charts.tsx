import {computed, defineComponent, onMounted, PropType, ref} from 'vue';
import s from "./Charts.module.scss";
import { FormItem } from "../../shared/Form";
import { LineChart } from "./LIneChart";
import { PieChart } from "./PieChart";
import { Bars } from "./Bars";
import {http} from '../../shared/Http';
import {Time} from '../../shared/time';

const DAY = 24*3600*1000
type Data1Item = {happen_at:string,amount:number}
type Data1 = Data1Item[]
export const Charts = defineComponent({
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
      // console.log(props.startDate,props.endDate);
      const kind = ref('expenses');
      const data1 = ref<Data1>([]);
      const betterData1 = computed<[string,number][]>(() => {
          if (!props.startDate || !props.endDate) return [];
          const diff = new Date(props.endDate).getTime() - new Date(props.startDate).getTime();
          const n = diff / DAY + 1;
          return Array.from({length:n}).map((_,i)=>{
              const time = new Time(props.startDate + 'T00:00:00.000+0800').add(i, 'day').getTimestamp()
              const item = data1.value[0]
              const amount = (item && new Date(item.happen_at).getTime() === time)
                  ? data1.value.shift()!.amount
                  : 0
              return [new Date(time).toISOString(),amount]
          })

          // const array = [];
          // const diff = new Date(props.endDate).getTime() - new Date(props.startDate).getTime();
          // const n = diff / DAY + 1;
          // let data1Index = 0
          // for (let i=0; i<n; i++) {
          //     const time = new Time(props.startDate+'T00:00:00.000+0800').add(i, 'day').getTimestamp()
          //     if(data1.value[data1Index] && new Date(data1.value[data1Index].happen_at).getTime() === time){
          //         array.push([new Date(time).toISOString(),data1.value[data1Index].amount])
          //         data1Index += 1
          //     }else {
          //         array.push([new Date(time).toISOString(), 0]);
          //     }
          // }
          // console.log(array);
          //
          // return array as [string,number][]
      })

    onMounted(async ()=>{
        const response = await http.get<{groups:Data1,summary:number}>('/items/summary',{
            happen_after:props.startDate,
            happen_before:props.endDate,
            _mock:'itemSummary'
        })
        data1.value =response.data.groups
        // console.log(data1.value);
        console.log(betterData1.value);


    })


    return () => (
      <div class={s.wrapper}>
        <FormItem
          label="类型"
          type="select"
          v-model={kind.value}
          options={[
            { value: "expenses", text: "支出" },
            { value: "income", text: "收入" },
          ]}
        />
        <LineChart data={betterData1.value}/>
        <PieChart />
        <Bars />
      </div>
    );
  },
});

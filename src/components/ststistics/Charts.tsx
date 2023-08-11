import {computed, defineComponent, onMounted, PropType, ref} from 'vue';
import s from "./Charts.module.scss";
import { FormItem } from "../../shared/Form";
import { LineChart } from "./LIneChart";
import { PieChart } from "./PieChart";
import { Bars } from "./Bars";
import {http} from '../../shared/Http';
type Data1Item = {happen_at:string,amount:number}
type Data1 = Data1Item[]
export const Charts = defineComponent({
  props: {
    starDate: {
      type: String as PropType<string>,
      required: false,
    },
    endDate: {
      type: String as PropType<string>,
      required: false,
    },
  },
  setup: (props, context) => {
      const kind = ref('expenses');
      const data1 = ref<Data1>([]);
      const betterData1 = computed(()=> {
          return data1.value.map(item=>
              [item.happen_at, item.amount] as [string, number]
          )
      })
    onMounted(async ()=>{
        const response = await http.get<{groups:Data1,summary:number}>('/items/summary',{
            happen_after:props.starDate,
            happen_before:props.endDate,
            _mock:'itemSummary'
        })
        data1.value =response.data.groups
        // console.log(data1.value);
        // console.log(betterData1.value);

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

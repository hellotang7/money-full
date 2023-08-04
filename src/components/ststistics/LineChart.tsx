import { defineComponent, onMounted, PropType, ref } from "vue";
import s from "./LineChart.module.scss";
import * as echarts from "echarts";

export const LineChart = defineComponent({
  setup: (props, context) => {
    const refDiv = ref<HTMLDivElement>();
    onMounted(() => {
      if (!refDiv.value) return;
      var myChart = echarts.init(refDiv.value);
      const option = {
        grid: [{ left: 0, top: 20, right: 0, bottom: 20 }],
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      };
      myChart.setOption(option);
    });

    return () => <div class={s.warpper} ref={refDiv}></div>;
  },
});

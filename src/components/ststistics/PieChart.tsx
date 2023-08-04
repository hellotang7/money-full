import { defineComponent, onMounted, ref } from "vue";
import s from "./PieChart.module.scss";
import * as echarts from "echarts";

export const PieChart = defineComponent({
  setup: (props, context) => {
    const refDiv = ref<HTMLDivElement>();
    onMounted(() => {
      if (!refDiv.value) return;
      var myChart = echarts.init(refDiv.value);
      const option = {
        grid: [{ left: 0, top: 20, right: 0, bottom: 20 }],
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    });

    return () => <div class={s.warpper} ref={refDiv}></div>;
  },
});

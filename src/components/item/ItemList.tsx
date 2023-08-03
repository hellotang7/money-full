import { defineComponent, PropType, reactive, ref, watchEffect } from "vue";
import s from "./ItemListl.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { ItemSummary } from "./ItemSummary";
import { Time } from "../../shared/time";
import { Overlay } from "vant";
import { Form, FormItem } from "../../shared/Form";

export const ItemList = defineComponent({
  setup: (props, context) => {
    const time = new Time();
    const customTime = reactive({
      start: new Time().format(),
      end: new Time().format(),
    });
    const timeList = [
      { start: time.firstDayOfMonth(), end: time.lastDayOfMonth() },
      {
        start: time.add(-1, "month").firstDayOfMonth(),
        end: time.add(-1, "month").lastDayOfMonth,
      },
      { start: time.firstDayOfYear(), end: time.lastDayOfYear() },
    ];

    const refSelected = ref("本月");

    watchEffect(() => {
      if (refSelected.value === "自定义时间") {
        refOverlayVisible.value = true;
      }
    });
    const refOverlayVisible = ref(false);
    const onsubmitCustomTime = (e: Event) => {
      e.preventDefault();
      refOverlayVisible.value = false;
    };
    return () => (
      <MainLayout class={s.wrapper}>
        {{
          title: () => "山竹记账",
          icon: () => <Icon name="menu" />,
          default: () => (
            <>
              <Tabs v-model:selected={refSelected.value}>
                <Tab name="本月">
                  <ItemSummary
                    starDate={timeList[0].start.format()}
                    endDate={timeList[0].end.format()}
                  />
                </Tab>
                <Tab name="上月">
                  <ItemSummary
                    starDate={timeList[1].start.format()}
                    endDate={timeList[0].end.format()}
                  />
                </Tab>
                <Tab name="今年">
                  <ItemSummary
                    starDate={timeList[2].start.format()}
                    endDate={timeList[2].end.format()}
                  />
                </Tab>
                <Tab name="自定义时间">
                  <ItemSummary
                    starDate={customTime.start}
                    endDate={customTime.end}
                  />
                </Tab>
              </Tabs>
              <Overlay show={refOverlayVisible.value} class={s.overlay}>
                <div class={s.overlay_inner}>
                  <header>请选择时间</header>
                  <main>
                    <Form onSubmit={onsubmitCustomTime}>
                      <FormItem
                        label="开始时间"
                        v-model={customTime.start}
                        type="date"
                      />
                      <FormItem
                        label="结束时间"
                        v-model={customTime.end}
                        type="date"
                      />
                      <FormItem>
                        <div class={s.actions}>
                          <button type="button">取消</button>
                          <button type="submit">确认</button>
                        </div>
                      </FormItem>
                    </Form>
                  </main>
                </div>
              </Overlay>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});

import { defineComponent, PropType, reactive, ref, watchEffect } from "vue";
import s from "./ItemListl.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { ItemSummary } from "./ItemSummary";
import { Time } from "../../shared/time";
import { Overlay } from "vant";
import { Form, FormItem } from "../../shared/Form";
import { OverlayIcon } from "../../shared/Overlay";

export const ItemList = defineComponent({
  setup: (props, context) => {
    const time = new Time();
    const customTime = reactive({
      start: new Time().format(),
      end: new Time().format(),
    });
    const timeList = [
      {
        start: time.firstDayOfMonth().format(),
        end: time.lastDayOfMonth().format(),
      },
      {
        start: time.add(-1, "month").firstDayOfMonth().format(),
        end: time.add(-1, "month").lastDayOfMonth().format(),
      },
      {
        start: time.firstDayOfYear().format(),
        end: time.lastDayOfYear().format(),
      },
    ];

    const refSelected = ref("本月");

    const refOverlayVisible = ref(false);
    const onsubmitCustomTime = (e: Event) => {
      e.preventDefault();
      refOverlayVisible.value = false;
    };
    const onSelect = (value: string) => {
      if (value === "自定义时间") {
        refOverlayVisible.value = true;
      }
    };
    return () => (
      <MainLayout class={s.wrapper}>
        {{
          title: () => "山竹记账",
          icon: () => <OverlayIcon />,
          default: () => (
            <>
              <Tabs
                v-model:selected={refSelected.value}
                onUpdate:selected={onSelect}
              >
                <Tab name="本月">
                  <ItemSummary
                    starDate={timeList[0].start}
                    endDate={timeList[0].end}
                  />
                </Tab>
                <Tab name="上月">
                  <ItemSummary
                    starDate={timeList[1].start}
                    endDate={timeList[0].end}
                  />
                </Tab>
                <Tab name="今年">
                  <ItemSummary
                    starDate={timeList[2].start}
                    endDate={timeList[2].end}
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
                          <button
                            type="button"
                            onClick={() => (refOverlayVisible.value = false)}
                          >
                            取消
                          </button>
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

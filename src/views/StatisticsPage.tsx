import { defineComponent } from "vue";
import { Charts } from "../components/ststistics/Charts";
import { TimeTabsLayout } from "../layouts/TimeTabsLayout";
export const StatisticsPage = defineComponent({
  setup: (props, context) => {
    return () => <TimeTabsLayout component={Charts} />;
  },
});

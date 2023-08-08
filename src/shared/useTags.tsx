import { onMounted, ref } from "vue";
import { http } from "./Http";
import { AxiosResponse } from "axios";

type Fetcher = (lpage: number) => Promise<AxiosResponse<Resources<Tag>>>;
export const useTags = (fetcher: Fetcher) => {
  const page = ref(0); //当前第几页
  const hasMore = ref(false); //默认没有更多
  const tags = ref<Tag[]>([]); //支出标签

  //统一请求Tag
  const ferchTags = async () => {
    const response = await fetcher(page.value);
    const { resources, pager } = response.data;
    tags.value.push(...resources);
    //判断是否需要加载下一页
    hasMore.value =
      (pager.page - 1) * pager.per_page + resources.length < pager.count;
    page.value += 1;
  };

  //初始化请求Tag
  onMounted(ferchTags);
  return {
    page,
    hasMore,
    tags,
    ferchTags,
  };
};

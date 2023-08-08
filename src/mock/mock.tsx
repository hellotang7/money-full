import { faker } from "@faker-js/faker";
import { AxiosRequestConfig } from "axios";

type Mock = (config: AxiosRequestConfig) => [number, any];

faker.setLocale("zh_CN");

export const mockItemCreate:Mock = config => {
  // return[200,{
  //   resource: {
  //     "id": 3922,
  //     "user_id": 2125,
  //     "amount": 9900,
  //     "note": null,
  //     "tag_ids": [5630],
  //     "happened_at": "2020-10-30T00:00:00.000+08:00",
  //     "created_at": "2023-06-27T11:34:40.458+08:00",
  //     "updated_at": "2023-06-27T11:34:40.458+08:00",
  //     "kind": "expenses"
  //   }
  // }]
  return[422,{
    errors:{
      tags_id:['必须选择标签'],
      amount:['金额不能为零']
    }
  }]
}

export const mockSession: Mock = (config) => {
  return [
    200,
    {
      jwt: faker.random.word(),
    },
  ];
};

export const mockTagIndex: Mock = (config) => {
  const { kind, page } = config.params;
  const per_page = 24;
  const count = 40;
  let id = 0;
  const createId = () => {
    id += 1;
    return id;
  };

  const createPaper = (page = 1) => ({
    page,
    per_page,
    count,
  });

  const createTag = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: config.params.kind,
      ...attrs,
    }));

  const createBody = (n: number, attrs?: any) => ({
    resources: createTag(n),
    pager: createPaper(page),
  });

  if (kind === "expenses" && (!page || page === 1)) {
    return [200, createBody(24)];
  } else if (kind === "expenses" && page === 2) {
    return [200, createBody(16)];
  } else if ((kind === "income" && !page) || page === 1) {
    return [200, createBody(24)];
  } else if (kind === "income" && page === 2) {
    return [200, createBody(16)];
  }
};

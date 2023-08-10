//使用faker创建伪数据
import { faker } from "@faker-js/faker";
import { AxiosRequestConfig } from "axios";

type Mock = (config: AxiosRequestConfig) => [number, any];

faker.setLocale("zh_CN");


let id = 0;
const createId = () => {
  id += 1;
  return id;
};
export const mockTagIndex: Mock = (config) => {
  const { kind, page } = config.params;
  const per_page = 24;
  const count = 40;

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

export const mockItemIndex:Mock = (config)=>{
const {kind,page} = config.params
  const per_page = 10
  const count = 15
  const createPager = (page = 1) =>({
    page,
    per_page,
    count,
  })

  const createTag = (attrs?: any) =>
     ({
        id: createId(),
        name: faker.lorem.word(),
        sign: faker.internet.emoji(),
        kind: config.params.kind,
        ...attrs,
      });

  const createItem = (n = 1,attrs?:any) =>
  Array.from({length:n}).map(()=>({
    id:createId(),
    user_id:createId(),
    amount:Math.floor(Math.random() * 10000),
    tags_id:[createId()],
    tags:[createTag()],
    happen_at:faker.date.past().toISOString(),
    kind
  }))

  const createBody = (n=1,attrs?:any)=>({
    resources: createItem(n),
    pager: createPager(page),

  })
  if (page === 1){
    return [200,createBody(10)]
  }else if(page === 2){
    return [200,createBody(5)]
  }else {
    return[200,{}]
  }
}

export const mockItemIndexBalance: Mock = (config) => {
  return [200, {
    income: 9900,
    expenses: 8900,
    balance: 1000,
  }];
};
export const mockTagEdit: Mock = (config) => {
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: "expenses",
    ...attrs,
  });
  return [200, { resource: createTag() }];
};

export const mocktagShow: Mock = (config) => {
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: "expenses",
    ...attrs,
  });
  return [200, { resource: createTag() }];
};

export const mockItemCreate: Mock = (config) => {
  return [
    200,
    {
      resource: {
        id: 3922,
        user_id: 2125,
        amount: 9900,
        note: null,
        tag_ids: [5630],
        happened_at: "2020-10-30T00:00:00.000+08:00",
        created_at: "2023-06-27T11:34:40.458+08:00",
        updated_at: "2023-06-27T11:34:40.458+08:00",
        kind: "expenses",
      },
    },
  ];
  // return[422,{
  //   errors:{
  //     tags_id:['必须选择标签'],
  //     amount:['金额不能为零']
  //   }
  // }]
};


export const mockSession: Mock = (config) => {
  return [
    200,
    {
      jwt: faker.random.word(),
    },
  ];
};

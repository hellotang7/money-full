//使用faker创建伪数据
import {faker} from '@faker-js/faker';
import {AxiosRequestConfig} from 'axios';

type Mock = (config: AxiosRequestConfig) => [number, any];

faker.setLocale('zh_CN');


let id = 0;
const createId = () => {
    id += 1;
    return id;
};
export const mockTagIndex: Mock = (config) => {
    const { kind, page } = config.params
    const per_page = 25
    const count = 26
    const createPaper = (page = 1) => ({
        page,
        per_page,
        count
    })
    const createTag = (n = 1, attrs?: any) =>
        Array.from({ length: n }).map(() => ({
            id: createId(),
            name: faker.lorem.word(),
            sign: faker.internet.emoji(),
            kind: config.params.kind,
            ...attrs
        }))
    const createBody = (n = 1, attrs?: any) => ({
        resources: createTag(n),
        pager: createPaper(page)
    })

    if (kind === 'expenses' && (!page || page === 1)) {
        return [200, createBody(24)];
    } else if (kind === 'expenses' && page === 2) {
        return [200, createBody(16)];
    } else if (kind === 'income' && (!page || page === 1)) {
        return [200, createBody(24)];
    } else{
        return [200, createBody(16)];
    }
};
export const mockItemIndex: Mock = (config) => {
    const {kind, page} = config.params;
    const per_page = 10;
    const count = 15;
    const createPager = (page = 1) => ({
        page,
        per_page,
        count,
    });

    const createTag = (attrs?: any) =>
        ({
            id: createId(),
            name: faker.lorem.word(),
            sign: faker.internet.emoji(),
            kind: config.params.kind,
            ...attrs,
        });

    const createItem = (n = 1, attrs?: any) =>
        Array.from({length: n}).map(() => ({
            id: createId(),
            user_id: createId(),
            amount: Math.floor(Math.random() * 10000),
            tag_ids: [createId()],
            tags: [createTag()],
            happen_at: faker.date.past().toISOString(),
            kind:config.params.kind
        } as Item));

    const createBody = (n = 1, attrs?: any) => ({
        resources: createItem(n),
        pager: createPager(page),

    });
    if (page === 1) {
        return [200, createBody(10)];
    } else if (page === 2) {
        return [200, createBody(5)];
    } else {
        return [200, {}];
    }
};
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
        kind: 'expenses',
        ...attrs,
    });
    return [200, {resource: createTag()}];
};
export const mocktagShow: Mock = (config) => {
    const createTag = (attrs?: any) => ({
        id: createId(),
        name: faker.lorem.word(),
        sign: faker.internet.emoji(),
        kind: 'expenses',
        ...attrs,
    });
    return [200, {resource: createTag()}];
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
                happen_at: '2020-10-29T16:00:00.000Z',
                created_at: '2022-07-03T15:35:56.301Z',
                updated_at: '2022-07-03T15:35:56.301Z',
                kind: 'expenses',
            } as Item
        }
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

export const mockItemSummary: Mock = (config)=> {
    const {group_by,kind} = config.params
    if (group_by === 'happen_at' && kind === 'expenses') {
        return [
            200,
            {
                groups: [
                    { happen_at: '2022-07-18T00:00:00.000+0800', amount: 100 },
                    { happen_at: '2022-07-22T00:00:00.000+0800', amount: 300 },
                    { happen_at: '2022-07-29T00:00:00.000+0800', amount: 200 }
                ],
                summary: 600
            }
        ]
    } else if (group_by === 'happen_at' && kind === 'income') {
        return [
            200,
            {
                groups: [
                    { happen_at: '2022-07-08T00:00:00.000+0800', amount: 100 },
                    { happen_at: '2022-07-12T00:00:00.000+0800', amount: 300 },
                    { happen_at: '2022-07-19T00:00:00.000+0800', amount: 200 }
                ],
                summary: 600
            }
        ]
    } else if (group_by === 'tag_id' && kind === 'expenses') {
        return [
            200,
            {
                groups: [
                    { tag_id: 1, tag: { id: 1, name: '交通', sign: faker.internet.emoji() }, amount: 100 },
                    { tag_id: 2, tag: { id: 2, name: '吃饭', sign: faker.internet.emoji() }, amount: 300 },
                    { tag_id: 3, tag: { id: 3, name: '购物', sign: faker.internet.emoji() }, amount: 200 }
                ],
                summary: 600
            }
        ]
    } else {
        return [
            200,
            {
                groups: [
                    { tag_id: 1, tag: { id: 1, name: '交通', sign: faker.internet.emoji() }, amount: 400 },
                    { tag_id: 2, tag: { id: 2, name: '吃饭', sign: faker.internet.emoji() }, amount: 300 },
                    { tag_id: 3, tag: { id: 3, name: '购物', sign: faker.internet.emoji() }, amount: 200 }
                ],
                summary: 900
            }
        ]
    }
};

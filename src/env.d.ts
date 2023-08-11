/// <reference types=vite/client />

declare module *.vue {
  import type { DefineComponent } from vue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}


type Tag = {
  id: number;
  user_id: number;
  name: string;
  sign: string;
  kind: expenses | income;
};

type Item = {
  id: number;
  user_id: number;
  amount: number;
  tag_ids: number[];
  happened_at: string;
  kind: expenses | income;
  tags?:Tag[]
};

type Resources<T = any> = {
  resources: [];
  pager: {
    page: number;
    per_page: number;
    count: number;
  };
};
type Resource<T> = {
  resource: T;
};


type  ResourceError = {
  errors:Record<string, string[]>
}

type User = {
  id: number,
  email: string,
  name: null,
  created_at: string,
  updated_at: string
}



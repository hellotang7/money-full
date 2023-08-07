import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

export class Http {
  instance: AxiosInstance;
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });
  }
  //read
  get<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, "params" | "url" | "method">
  ) {
    return this.instance.request<R>({
      ...config,
      url: url,
      params: query,
      method: "get",
    });
  }
  //create
  post<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, "url" | "data" | "method">
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      data,
      method: "post",
    });
  }
  //updata
  patch<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, "url" | "data">
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      data,
      method: "patch",
    });
  }
  //destroy
  delete<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, "params" | "url" | "method">
  ) {
    return this.instance.request<R>({
      ...config,
      url: url,
      params: query,
      method: "delete",
    });
  }
}

export const http = new Http("/api/v1");

http.instance.interceptors.request.use((config) => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    config.headers!.Authorization = `Bearer ${jwt}`; //如果本地jwt存在，则将其添加到请求头中的Authorization字段中
  }
  return config;
});
http.instance.interceptors.response.use(
  (response) => {
    console.log("拦截成功");
    return Response;
  },
  (error) => {
    if (error.response) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 429) {
        alert("请求太频繁了");
      }
    }
    throw error;
  }
);

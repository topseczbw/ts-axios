// 字符字面量 定义普通数据类型
export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'head'
  | 'HEAD'
  | 'patch'
  | 'PATCH'

// 接口定义对象、函数、类类型
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

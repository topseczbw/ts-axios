import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  const { data = null, url, method = 'get' } = config

  // 先创建一个XMLHttpRequest对象
  const request = new XMLHttpRequest()

  // 然后初始化这个对象的配置：请求方式、请求地址、是否异步
  request.open(method.toUpperCase(), url, true)

  // 发送消息
  request.send(data)
}

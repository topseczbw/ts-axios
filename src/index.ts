import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  // 真正发送请求
  return xhr(config).then(res => {
    // 相当于拦截，then函数中返回的也是个promise
    return transformResponseData(res)
  })
}

/**
 * 处理config文件，需要做很多件事包括：
 * 转化url
 * @param config
 */
function processConfig(config: AxiosRequestConfig) {
  config.url = transformURL(config)
  // 一定要先处理headers在再处理数据
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformHeaders(config: AxiosRequestConfig): any {
  // 保证headers一定存在，就算使用时没有赋值header
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig) {
  return transformRequest(config.data)
}

function transformResponseData(res: AxiosResponse) {
  res.data = transformResponse(res.data)
  return res
}

export default axios

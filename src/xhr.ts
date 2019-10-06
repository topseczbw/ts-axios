import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headers, responseType } = config

    // 先创建一个XMLHttpRequest对象
    const request = new XMLHttpRequest()

    // 根据用户设置config设置responseType
    if (responseType) {
      request.responseType = responseType
    }

    // 然后初始化这个对象的配置：请求方式、请求地址、是否异步
    request.open(method.toUpperCase(), url, true)


    // open之后才可以设置header 根据用户设置config设置header
    Object.keys(headers).forEach(name => {
      // 当没有数据时，content-type这个header是没有意义的，删除
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      }
      request.setRequestHeader(name, headers[name])
    })

    request.onreadystatechange = function() {
      // =4 时可以拿到响应结果
      if (request.readyState !== 4) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      // 返回用户需要的核心数据即可
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    // 发送消息
    request.send(data)
  })
}

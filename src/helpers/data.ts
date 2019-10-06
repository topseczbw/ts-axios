// 请求前处理data
import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    // 由于这个data 可能不是json字符串, 如果是 就转化 ，如果不是 那也没关系 原样返回就好
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothine
    }
  }
  return data
}

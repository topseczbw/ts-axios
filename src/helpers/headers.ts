import { isPlainObject } from './util'

function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    // 判断现有的请求头中是否有同名的头  如果有 就规范化这个请求头key值的命名
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      // 将 值 给规范化的请求头
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      // 需要对header的名字做一层规范化  因为服务器端是不区分大小写的
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

export function parseHeaders(headers: any): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach((line: string) => {
    let [key, value] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      // 跳到下次循环
      return
    }
    if (value) {
      value = value.trim()
    }
    parsed[key] = value
  })

  return parsed
}

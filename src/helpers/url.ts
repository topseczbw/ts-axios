import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  return (
    encodeURIComponent(val)
      // 对被编码的特殊符号做一次解码，再转化回来
      .replace(/%40/g, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      // 空格变加号
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']')
  )
}

export function buildURL(url: string, params?: any): string {
  // 虽然使用了ts，但是改写的容错代码、防御性代码还是要写的
  if (!params) {
    return url
  }

  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    // 过滤掉value是空的清空
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    // 由于数据有多个value，故此把value是普通值的和数组的都转换成数组的 然后循环处理
    // 保证当value是数组时  他们key相同 并在key上加一个标识[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')
  if (serializedParams) {
    // 路由是否有hash标识
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      // 不要#后面的东西
      url = url.slice(0, markIndex)
    }
    // 如果先前的url本身有？ 说明在传入url选项时，已经有一些写好的参数了，需要保留
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}

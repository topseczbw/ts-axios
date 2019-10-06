const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[Object Date]'
}

// export function isObject(val: any):val is Object {
//   // 完整的object判断
//   return val !== null && typeof val === 'object'
// }

export function isPlainObject(val: any): val is Object {
  // 由于还有formData function 都属于对象，所以要判断是不是一个普通的对象，
  return toString.call(val) === '[object Object]'
}

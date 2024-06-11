import {
  getItem,
  setItem
} from './localStorage'
import config from '@/config/config'

/**
 * 管理cookie
 * @param {'get'|'set'} method 
 * @param {*} cookie 
 */
export function manageCookie(method, cookie) {
  if (method == 'set') {
    setItem(config.cookieKey, cookie)
  }
  if (method == 'get') {
    return getItem(config.cookieKey)
  }
}

/**
 * 精确节流实现
 * @param {Function} fn 需要节流的函数
 * @param {number} delay 节流时间间隔
 */
export function throttledPrecise(fn, delay) {
  // 闭包
  let timer = null,
    startTime = 0
  return function () {
    let curTime = Date.now() // 当前时间
    let remaining = delay - (curTime - startTime) // 从上一次到现在，还剩下多少多余时间
    let args = arguments
    if (remaining <= 0) {
      fn.apply(this, args)
      startTime = curTime
    } else {
      clearTimeout(timer)
      timer = setTimeout(fn.bind(this, ...args), remaining)
    }
  }
}

/**
 * 获取元素信息
 * @param {*} thisArg 
 * @param {*} selector 
 */
// export function getElementInfo(thisArg, selector) {
//   return new Promise((resolve, reject) => {
//     const query = thisArg.createSelectorQuery()
//     const element = query.select(selector)
//     if (element) {
//       element.boundingClientRect(function (res) {
//         resolve(res)
//         // console.log(res, 'res')
//         /**
//          bottom: 803.2000122070312
//          dataset: {}
//          height: 603.2000122070312
//          id: ""
//          left: 0
//          right: 375.20001220703125
//          top: 200 // 这个组件内 该节点的上边界坐标
//          width: 375.20001220703125
//          */
//       }).exec()
//     } else {
//       reject(Error('获取触摸区域元素失败'))
//     }
//   })
// }
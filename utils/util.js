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

/** 并发请求任务 控制器 */
export class SuperTask {
  /**
   * @param {number} maxCount 最大并发数
   */
  constructor(maxCount = 5) {
    this.maxCount = maxCount;
    this.runningCount = 0;
    this.taskList = [];
  }

  /**
   * 添加异步任务
   * @param {()=>Promise} task
   * @returns
   */
  addTask(task) {
    return new Promise((resolve, reject) => {
      this.taskList.push({
        task,
        resolve,
        reject,
      });
      this._run();
    });
  }

  /** 运行任务队列中的任务 */
  _run() {
    // 循环执行任务，如果 当前运行任务数 小于 最大并发数，且任务列表有任务，就执行任务
    while (this.runningCount < this.maxCount && this.taskList.length) {
      const {
        task,
        resolve,
        reject
      } = this.taskList.shift();
      this.runningCount++;
      task().then(resolve)
        .catch(reject)
        .finally(() => {
          this.runningCount--;
          this._run(); // 该任务结束了，空出位置，尝试执行下一个任务
        });
    }
  }
}

/**
 *  并发请求资源，当所有资源都完成，就返回结果列表，结果列表的顺序与参数列表的顺序相同
 * @param { any[] } argList
 * @param { (arg) => Promise } requestFn
 * @param { number } limitCount
 */
export const requestForResources = (argList, requestFn, limitCount = 5) => {
  return new Promise((resolve, reject) => {
    const superTask = new SuperTask(limitCount);
    const resList = new Array(argList.length);
    let currentCount = 0;
    for (let i = 0; i < argList.length; i++) {
      const promise = superTask.addTask(() => requestFn(argList[i]));
      promise.then(res => {
        resList[i] = res;
        currentCount++;
        // 所有的 任务都完成了，返回结果列表
        if (currentCount === argList.length) {
          resolve(resList);
        }
      }).catch(reject);
    }
  });
};

/**
 * 基础防抖函数
 * @param {Function} func 需要防抖的函数
 * @param {number} wait 防抖时间间隔
 */
export function basicDebounce(func, wait = 500) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(func.bind(this, ...args), wait);
  };
}
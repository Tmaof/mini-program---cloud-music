import config from '@/config/config'
import {
  manageCookie
} from '@/utils/util'

/**
 * 封装 wx.request
 */
class Requester {
  defaultOptions = {
    method: "GET",
    data: null,
    timeout: 20000,
  }
  baseUrl = ''
  constructor(options = null, baseUrl = '') {
    this.baseUrl = baseUrl
    if (!/(\/)$ /.test(this.baseUrl)) {
      this.baseUrl + '/'
    }
    Object.assign(this.defaultOptions, options)
  }


  /**
   * 封装 wx.request 
   * @param {{
   * url:string, 
   * method?:'GET'|'POST'| *,
   * data?, 
   * header?, 
   * timeout?:number
   * }} options 
   */
  request(options) {
    if (!options.url) return Promise.reject(new Error('未配置url'))
    if (/^(\/) /.test(options.url)) {
      options.url = options.url.slice(1)
    }
    options.header = options.header || {}
    // 调用请求拦截器
    const newOptions = this.requestIntercept(options) || options
    return new Promise((resolve, reject) => {
      const req = wx.request.bind(this)
      req({
        ...this.defaultOptions,
        ...newOptions,
        url: this.baseUrl + newOptions.url,
        success: (res) => {
          // 调用响应拦截器
          const newRes = this.responseIntercept(res)
          resolve(newRes || res)
        },
        fail: (err) => {
          // 调用错误拦截器
          this.errIntercept(err)
          reject(err)
        }
      })
    })
  }
  /**
   * 请求拦截器
   * @param {*} options 
   */
  requestIntercept(options) {
    // 携带cookie
    const cookie = manageCookie('get')
    options.header.Cookie = cookie || ''
    return options
  }

  /**
   * 响应拦截器
   * @param {*} res 
   */
  responseIntercept(res) {

    return res.data
  }

  /**
   * 错误拦截器
   * @param {*} error 
   */
  errIntercept(error) {
    console.error(error)
    wx.showToast({
      title: error.errMsg,
      icon: 'none'
    })
  }

}
const REQ = new Requester(null, config.baseUrl)

/**
 * 封装 wx.request 
 * @param {{
 * url:string, 
 * method?:'GET'|'POST'| *,
 * data?, 
 * header?, 
 * timeout?:number
 * }} options 
 * @returns { Promise }
 */
export default function request(options) {
  return REQ.request(options)
}
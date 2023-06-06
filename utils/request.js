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
    options.data = options.data || {}
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
    /**
     * https: //binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%b0%83%e7%94%a8%e5%89%8d%e9%a1%bb%e7%9f%a5
     * 该项目中使用post请求时,携带cookie和一个时间戳
     * 目的是防止返回的缓存结果,
     * 这主要用于获取用户的播放记录和用户的收藏记录,用户登录状态查询等(对及时性要求高),
     * 其他的例如推荐歌曲,排行榜等使用缓存数据即可.
     */
    if (/(post)/i.test(options.method)) {
      options.data.cookie = manageCookie('get')
      const timestamp = 'timestamp=' + Date.now()
      if (/\?/.test(options.url)) {
        options.url = options.url + `&` + timestamp
      } else {
        options.url = options.url + `?` + timestamp
      }
    }

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
      icon: 'none',
      duration: 5000,
    })
  }

}

const REQ = new Requester(null, config.baseUrl)

/**
 * 封装 wx.request 
 * @param {{
 * url:string, 
 * method?:'GET'|'POST',
 * data?, 
 * header?, 
 * timeout?:number
 * }} options 
 * @returns { Promise }
 */
export const request = function (options) {
  return REQ.request(options)
}
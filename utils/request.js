import Message from 'tdesign-miniprogram/message/index';
import config from '@/config/config'

/**
 * 封装 wx.request
 */
class Request {
  defaultOptions = {
    method: "GET",
    data: null,
    timeout: 20000,
    baseUrl: ''
  }

  constructor(options) {
    Object.assign(this.defaultOptions, options)
  }


  /**
   * 封装 wx.request 
   * @param {{
   * url:string, 
   * method:'GET'|'POST'| *,
   * data, 
   * header, 
   * timeout:number
   * }} options 
   */
  request(options) {
    if (!options.url) return Promise.reject(new Error('未配置url'))
    // 调用请求拦截器
    const newOptions = this.requestIntercept(options) || options
    return new Promise((resolve, reject) => {
      const req = wx.request.bind(this)
      req({
        ...this.defaultOptions,
        ...newOptions,
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
    Message.error({
      content: error.errMsg
    })
  }

}
const REQ = new Request({
  baseUrl: config.baseUrl
})

export default REQ.request.bind(REQ)
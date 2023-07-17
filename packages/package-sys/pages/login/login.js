import {
  getLoginQr,
  isLogin,
  touristLanding
} from '@/api/login/login'
import Message from 'tdesign-miniprogram/message/index';
import {
  injectUserStore
} from '@/behaviors/injectUserStore'

import {
  manageCookie
} from '@/utils/util'


Page({
  behaviors: [injectUserStore],
  /**
   * 页面的初始数据
   */
  data: {
    qrImg: '', //二维码
    popupVisible: false, //扫码弹出层
    qrLoginStatusTip: '', //扫码状态
    redirect: '/pages/TB-home/home', //重定向页面路径
    isRefreshQr: false, //是否显示刷新二维码按钮
    timer: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      redirect
    } = options
    if (redirect) {
      this.setData({
        redirect
      })
    }
  },

  /**
   * 弹出层状态改变
   * @param {*} e 
   */
  async onVisibleChange(e) {
    const popupVisible = e.detail.visible
    this.setData({
      popupVisible,
    })
    if (popupVisible) {
      let qrImg = this.data.qrImg
      if (!qrImg || this.data.isRefreshQr) {
        qrImg = await getLoginQr()
        // 轮询扫码状态
        this._isLogin()
        this.setData({
          qrImg,
          isRefreshQr: false
        })
      }
    } else {
      // 关闭轮询
      this._stopQuery()
    }
  },

  /**
   * 点击扫码登录
   */
  onClickQrLoginBtn() {
    this.onVisibleChange({
      detail: {
        visible: true
      }
    })
    this.setData({
      popupVisible: true
    })
  },

  /**
   * 轮询扫码登录状态
   */
  _isLogin() {
    const timer = setInterval(async () => {
      const res = await isLogin()

      // 扫码登录成功
      if (res.isLogin) {
        this._loginSuccess(res.cookie)
        this._stopQuery()
        return
      }

      // 二维码过期,结束查询,刷新二维码
      if (res.code == 800) {
        this.setData({
          isRefreshQr: true
        })
        this._stopQuery()
      }

      // 跟新提示状态
      this.setData({
        qrLoginStatusTip: res.message
      })

    }, 3000);
    this.setData({
      timer
    })
  },

  /**
   * 停止轮询
   */
  _stopQuery() {
    clearInterval(this.data.timer)
    const tid = setTimeout(() => {
      this.setData({
        qrImg: ''
      })
      clearTimeout(tid)
    }, 500)
  },

  /**
   * 点击游客登录
   */
  async onClickTouristLogin() {
    const {
      cookie,
      userId,
      createTime
    } = await touristLanding()

    this._loginSuccess(cookie)
  },

  /**
   * 登陆成功
   * @param {string} cookie
   */
  _loginSuccess(cookie) {
    // 消息提示
    Message.success({
      context: this,
      align: 'center',
      offset: [20, 32],
      content: '登录成功!',
    });
    // 保存cookie
    manageCookie('set', cookie)
    //重新获取用户信息
    this.updateUserInfo()
    // 重定向
    wx.reLaunch({
      url: this.data.redirect,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    clearInterval(this.data.timer)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
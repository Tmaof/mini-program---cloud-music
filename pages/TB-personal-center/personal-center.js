import {
  injectAppStore
}
from '@/behaviors/injectAppStore'
import {
  injectUserStore
} from '@/behaviors/injectUserStore'
import {
  manageCookie
} from '@/utils/util'
import {
  logout
} from '@/api/login/login'
import Message from 'tdesign-miniprogram/message/index';
Page({
  behaviors: [injectAppStore, injectUserStore],
  options: {
    styleIsolation:'shared'
  },
  /**
   * 页面的初始数据
   */
  data: {
    touche: null, //上一次滑动的信息
    infoCardTop: 40, //信息卡片的top值
    infoCardTs: false, //返回过渡效果
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setTabBarIndexValue(2)
  },

  /**
   * 退出登录
   */
  onLogout() {
    // 清除cookie
    manageCookie('set', undefined)
    //清除用户信息
    this.clearUserInfo()
    // 发送请求
    logout()
    // 消息提示
    Message.success({
      context: this,
      align: 'center',
      offset: [20, 32],
      content: '退出成功!',
    });
  },

  /**
   * 下拉显示背景图 - 开始
   */
  onTouchStart(e) {
    this.setData({
      infoCardTs: false
    })
  },
  /**
   * 下拉显示背景图 - 移动中
   */
  onTouchmove(e) {
    const top = this.data.infoCardTop
    const curCouche = e.touches[0]
    if (top >= 75) return
    if (this.data.touche && (curCouche.clientY - this.data.touche.clientY <= 0)) return
    this.setData({
      touche: curCouche
    })
    this.setData({
      infoCardTop: top + 1.5
    })
  },
  /**
   * 下拉显示背景图 - 结束
   */
  onTouchEnd(e) {
    this.setData({
      touche: null
    })
    this.setData({
      infoCardTop: 40,
      infoCardTs: true
    })
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
import {
  getDjDetail,
  subscribeDj
} from '@/packages/package-home-center/api/broadcaster-display/broadcasterDisplay'
import {
  injectCheckLogin
} from '@/behaviors/injectCheckLogin'

Page({
  behaviors: [injectCheckLogin],
  options: {
    styleIsolation: 'shared'
  },
  /**
   * 页面的初始数据
   */
  data: {
    djId: 0, //电台ID
    djInfo: {}, //电台信息
    bgc: '', //背景色
    bgcList: ['rgba(247, 177, 155, 0.671)', ' rgba(155, 206, 247, 0.671)', 'rgba(195, 155, 247, 0.671)', 'rgba(226, 155, 247, 0.671)', 'rgba(239, 155, 247, 0.671)']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      djId: options.djId,
      bgc: this.data.bgcList[Math.round(Math.random() * (this.data.bgcList.length - 1))]
    })
    this._getDjInfo()
  },

  /**
   * 获取电台信息
   */
  async _getDjInfo() {
    const {
      data
    } = await getDjDetail(this.data.djId)

    this.setData({
      djInfo: data
    })

  },
  /**
   * 收藏/取消收藏 歌单
   * @param {*} e 
   */
  async onSubscribeDj(e) {
    if (!this.checkLogin()) return
    const subscribe = e.currentTarget.dataset.subscribe
    const {
      djId,
      djInfo
    } = this.data
    const {
      code
    } = await subscribeDj(djId, subscribe ? 1 : 0)
    if (code == 200) {
      this.setData({
        'djInfo.subed': subscribe,
        'djInfo.subCount': 0 + djInfo.subCount + (subscribe ? 1 : -1)
      })
    }
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
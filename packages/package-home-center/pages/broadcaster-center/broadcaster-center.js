import {
  getHotDj,
  getRecommendDj,
  getTodayPerferedDj
} from '@/packages/package-home-center/api/broadcaster-center/broadcasterCenter'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todayPerferedDj: [],
    recommendDj: [],
    hotDj: [],
    hotDjLimit: 30,
    hotDjOffset: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this._initData()
  },
  async _getHotDj() {
    const {
      djRadios
    } = await getHotDj(this.data.hotDjLimit, this.data.hotDjOffset)
    this.setData({
      hotDj: [...this.data.hotDj, ...djRadios],
      hotDjOffset: this.data.hotDjOffset + this.data.hotDjLimit
    })
  },
  async _initData() {
    const {
      data
    } = await getTodayPerferedDj()

    const {
      djRadios
    } = await getRecommendDj()

    this.setData({
      todayPerferedDj: data,
      recommendDj: djRadios
    })

    this._getHotDj()
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
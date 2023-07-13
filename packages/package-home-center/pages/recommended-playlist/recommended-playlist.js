import {
  getRecommendedPlaylists,
} from '@/api/home/home'
import {
  request
} from '@/utils/request';
Page({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 页面的初始数据
   */
  data: {
    recommendedPlaylists: [],
    dataLimit: 30,
    increment: 30,
    maxNums: 450
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this._getRecommendedPlaylists()
  },

  /**
   * 获取推荐歌曲
   */
  async _getRecommendedPlaylists() {
    if (this.data.dataLimit - this.data.increment >= this.data.maxNums) {
      wx.showToast({
        title: '没有更多了呦',
        icon: 'none'
      })
      return
    }
    const {
      result
    } = await getRecommendedPlaylists(this.data.dataLimit);
    const idList = this.data.recommendedPlaylists.map(item => item.id)
    const newList = result.filter(item => (!idList.includes(item.id)))
    this.setData({
      dataLimit: this.data.dataLimit + this.data.increment,
      recommendedPlaylists: [...this.data.recommendedPlaylists, ...newList]
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
// packages/package-personal-center/pages/recent-play/recent-play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTabs: {
      song: true,
      video: false,
      playlist: false,
      voice: false,
      dj: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  onTabsChange(e) {
    this.data.showTabs[e.detail.value] = true
    this.setData({
      showTabs: this.data.showTabs
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
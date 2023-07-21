import {
  injectAppStore
}
from '@/behaviors/injectAppStore'

Page({
  behaviors: [injectAppStore],
  options: {
    styleIsolation: 'shared'
  },
  /**
   * 页面的初始数据
   */
  data: {
    TabValue:'mv',
  },

  /**
   * 切换tab页
   */
  ontabChange(e) {
    this.setData({
      TabValue: e.detail.value
    })
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
    this.setTabBarIndexValue(1)
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
    const select = this.data.TabValue == 'commend' ? '.commend-video' : '.mv-video'
    const child = this.selectComponent(select)
    // 下拉加载更多
    child._loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
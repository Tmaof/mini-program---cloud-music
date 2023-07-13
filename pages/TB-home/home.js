import {
  injectAppStore
}
from '@/behaviors/injectAppStore'
import {
  getBannerList,
  getRecommendedPlaylists,
  getTheList
} from '@/api/home/home'

Page({
  options: {
    styleIsolation: 'apply-shared'
  },
  behaviors: [injectAppStore],
  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [], //轮播图
    bannerImgUrlList: [], //轮播图封面url
    recommendedPlaylists: [], //推荐歌单
    theList: [] //排行榜
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this._getBanner()
    this._getRecommendedPlaylists()
    this._getTheList()

  },

  /**
   * 获取轮播图数据
   */
  async _getBanner() {
    const res = await getBannerList()
    this.setData({
      bannerList: res.banners,
      bannerImgUrlList: res.banners.map((item) => item.pic)
    })
  },

  /**
   * 获取推荐歌曲
   */
  async _getRecommendedPlaylists() {
    const res = await getRecommendedPlaylists(30);
    this.setData({
      recommendedPlaylists: res.result || []
    })
  },

  /**
   * 获取排行榜
   */
  async _getTheList() {
    // 为了减少首页加载时间,先请求一个榜单的数据
    const res = await getTheList(0, 2, 30)
    this.setData({
      theList: res
    })
    // 请求其他榜单数据
    setTimeout(async () => {
      const res = await getTheList(2, 10, 30)
      this.setData({
        theList: [...this.data.theList, ...res]
      })
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setTabBarIndexValue(0)
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
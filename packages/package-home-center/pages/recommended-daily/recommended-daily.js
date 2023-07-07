import {
  getDailyRecommendedSongs
} from '@/packages/package-home-center/api/recommended-daily/recommendedDaily'
import dayjs from 'dayjs'

Page({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 页面的初始数据
   */
  data: {
    dailySongsInfo: {
      dailySongs: [],
      recommendReasons: [],

    },
    currentDate: {
      month: dayjs().format('MM'),
      day: dayjs().format('DD'),
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this._getDailyRecommendedSongs()
  },

  /**
   * 获取每日推荐歌曲
   */
  async _getDailyRecommendedSongs() {
    const {
      data
    } = await getDailyRecommendedSongs()
    if (!data) return
    this.setData({
      dailySongsInfo: data
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
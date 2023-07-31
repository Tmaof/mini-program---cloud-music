import {
  injectAppStore
}
from '@/behaviors/injectAppStore'
import {
  injectMusicPlayerStore
} from '@/behaviors/injectMusicPlayerStore'
import {
  getBannerList,
  getRecommendedPlaylists,
  getTheList
} from '@/api/home/home'

Page({
  options: {
    styleIsolation: 'apply-shared'
  },
  behaviors: [injectAppStore, injectMusicPlayerStore],
  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [], //轮播图
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
  //判断轮播图类型
  _getBannerType(banner) {
    const res = {
      playlist: false,
      song: false,
      activity: false,
      other: false
    }
    const playlistType = ['热碟推荐', '新碟首发', '歌单']
    const songType = ['新歌首发', '热歌推荐']
    const activityType = ['活动', '独家策划', '演出']
    const mvType = ['MV首发']
    const albumType = ['数字专辑']
    const typeTitle = banner.typeTitle
    if (playlistType.includes(typeTitle)) {
      res.playlist = true
    } else if (songType.includes(typeTitle)) {
      res.song = true
    } else if (activityType.includes(typeTitle)) {
      res.activity = true
    } else if (mvType.includes(typeTitle)) {
      res.mv = true
    } else if (albumType.includes(typeTitle)) {
      res.album = true
    } else {
      res.other = true
    }
    return res
  },
  /**
   * 获取轮播图数据
   */
  async _getBanner() {
    const res = await getBannerList()
    const bannerList = res.banners.map(item => {
      item.type = this._getBannerType(item)
      return item
    })
    this.setData({
      bannerList,
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
    const tid = setTimeout(async () => {
      const res = await getTheList(2, 10, 30)
      this.setData({
        theList: [...this.data.theList, ...res]
      })
      clearTimeout(tid)

    }, 1000)
  },
  // 播放歌曲
  onPlayMusic(e) {
    const song = e.currentTarget.dataset.song
    this.changeSongList(null, [song])
    this.playTheSong(song.id)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setTabBarIndexValue()
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
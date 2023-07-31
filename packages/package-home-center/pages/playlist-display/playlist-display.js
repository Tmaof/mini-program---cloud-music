import {
  getSongListByPlaylistId
} from '@/api/home/playlist/playlist'
import {
  getPlaylistDetail,
  getPlaylistDynamic,
  subscribePlaylist
} from '@/packages/package-home-center/api/playlist-display/playlistDisplay'
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
    playlistId: 0, //歌单ID
    songList: [], //歌曲列表
    playlistInfo: {}, //歌单信息
    dynamic: {}, //歌单动态信息
    bgc: '', //背景色
    bgcList: ['rgba(247, 177, 155, 0.671)', ' rgba(155, 206, 247, 0.671)', 'rgba(195, 155, 247, 0.671)', 'rgba(226, 155, 247, 0.671)', 'rgba(239, 155, 247, 0.671)']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      playlistId: options.playlistId,
      bgc: this.data.bgcList[Math.round(Math.random() * (this.data.bgcList.length - 1))]
    })
    this._getPlaylistInfo()
  },

  /**
   * 获取歌单信息
   */
  async _getPlaylistInfo() {
    const {
      playlist
    } = await getPlaylistDetail(this.data.playlistId)

    const dynamic = await getPlaylistDynamic(this.data.playlistId)
    this.setData({
      playlistInfo: playlist,
      dynamic
    })
    const tid = setTimeout(async () => {
      const {
        songs
      } = await getSongListByPlaylistId(this.data.playlistId)
      this.setData({
        songList: songs || [],
      })
      clearTimeout(tid)
    }, 50);
  },

  /**
   * 收藏/取消收藏 歌单
   * @param {*} e 
   */
  async onSubscribePlaylist(e) {
    if (!this.checkLogin()) return
    const subscribe = e.currentTarget.dataset.subscribe
    const {
      playlistId,
      dynamic
    } = this.data
    const {
      code
    } = await subscribePlaylist(playlistId, subscribe ? 1 : 2)
    if (code == 200) {
      this.setData({
        'dynamic.subscribed': subscribe,
        'dynamic.bookedCount': 0 + dynamic.bookedCount + (subscribe ? 1 : -1)
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
import {
  getSongListByPlaylistId
} from '@/api/home/playlist/playlist'
import {
  getPlaylistDetail,
  getPlaylistDynamic
} from '@/packages/package-home-center/api/playlist-display/playlistDisplay'

Page({
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
    setTimeout(async () => {
      const {
        songs
      } = await getSongListByPlaylistId(this.data.playlistId)
      this.setData({
        songList: songs || [],
      })
    }, 50);
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
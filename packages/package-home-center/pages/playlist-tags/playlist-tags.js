import {
  getPlaylistCategory
} from '@/packages/package-home-center/api/playlist-tags/playlistTags'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    /**
     [{
       id: 0,
       name: '语种'
     }]
     */
    tagList: [],
    popupVisible: false,
    currentTagName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this._getPlaylistCategory()
  },

  async _getPlaylistCategory() {
    let {
      categories,
      sub
    } = await getPlaylistCategory()
    /**
     "categories": {
       "0": "语种",
       "1": "风格",
       "2": "场景",
       "3": "情感",
       "4": "主题"
     }
     */
    categories = Object.keys(categories).map(item => {
      return {
        id: item,
        name: categories[item]
      }
    })
    this.setData({
      tagList: sub,
      categories
    })
  },

  onVisibleChange() {
    this.setData({
      popupVisible: false
    })
  },

  /**
   * 点击标签
   * @param {*} e 
   */
  onClickTag(e) {
    const tagName = e.currentTarget.dataset.tagname
    const playlistItemDisplayEle = this.selectComponent('#playlist-item-display')
    playlistItemDisplayEle._resetData(tagName)
    this.setData({
      popupVisible: true,
      currentTagName: tagName
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
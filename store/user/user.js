import {
  observable,
  action
} from 'mobx-miniprogram'

import {
  getUserInfo,
  getCollectSongList
} from '@/api/my-center/myCenter'

export const userStore = observable({
  userInfo: null, //用户信息
  userId: undefined, //用户ID
  isUserLogin: false, //当前是否登录
  isVisitor: false, //是否是游客登陆
  collectedPlaylist: [], //用户收藏的歌单
  userLikedPlaylist: null, //用户喜欢的歌单

  /**
   * 设置用户信息
   */
  setUserInfo: action(function (userInfo) {
    this.userInfo = userInfo
  }),
  /**
   * 获取,更新用户信息
   */
  updateUserInfo: action(async function () {
    const {
      data
    } = await getUserInfo()

    if (data && data.code == 200) {
      this.userInfo = data.profile || data.account
      this.userId = this.userInfo.id || this.userInfo.userId
      this.isUserLogin = true
      this.isVisitor = data.profile ? false : true;
      // 获取用户收藏的歌单
      const {
        playlist
      } = await getCollectSongList(this.userId)
      this.collectedPlaylist = playlist.slice(1)
      this.userLikedPlaylist = playlist[0]

    }
  }),
  /**
   * 清空用户信息
   */
  clearUserInfo: action(function () {
    console.log('已经清空用户信息')
    this.userInfo = null
    this.isUserLogin = false
    this.isVisitor = false
    this.collectedPlaylist = []
    this.userLikedPlaylist = null
  }),
  /**
   * 检查是否非登陆,如果没有登陆则跳转登陆页
   */
  checkLogin: action(function (redirect) {
    if (this.isUserLogin && !this.isVisitor) return true
    wx.showToast({
      title: '请使用扫码进行登录',
      icon: 'none'
    })
    wx.navigateTo({
      url: `/packages/package-sys/pages/login/login?redirect=${redirect}`,
    })
    return false
  })
})
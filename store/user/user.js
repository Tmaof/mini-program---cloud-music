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
  userId: null, //用户ID
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
   * @param {*} strictMode 严格模式,为true代表必须使用非游客登陆,为false代表可以使用游客登陆,也可以使用非游客登录
   */
  checkLogin: action(function (redirect, strictMode = true) {
    // 已经满足登录状态要求
    if (this.isUserLogin && !this.isVisitor) return true
    if (!strictMode && this.isVisitor) return true
    // 需要进行登录
    wx.showToast({
      title: strictMode ? '请使用"非游客方式"进行登录' : '请进行登录!',
      icon: 'none',
      duration: 2000
    })
    const tid = setTimeout(() => {
      wx.navigateTo({
        url: `/packages/package-sys/pages/login/login?redirect=${redirect}`,
      })
      clearTimeout(tid)
    }, 2000)
    return false
  })
})
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
  isUserLogin: false, //当前是否登录
  collectSongList: [], //用户收藏的歌单
  userLikeSongLIst: null, //用户喜欢的歌单

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
      data: res
    } = await getUserInfo()

    if (res.code == 200 && res.account.userName != '0_m15849353741@163.com') {
    // if (res.code == 200) {
      this.userInfo = res.profile || res.account
      this.isUserLogin = true
      // 获取用户收藏的歌单
      const {
        playlist
      } = await getCollectSongList(this.userInfo.id || this.userInfo.userId)
      this.collectSongList = playlist.slice(1)
      this.userLikeSongLIst = playlist[0]
    }
  }),
  /**
   * 清空用户信息
   */
  clearUserInfo: action(function () {
    console.log('已经清空用户信息')
    this.userInfo = null
    this.isUserLogin = false
    this.collectSongList = []
    this.userLikeSongLIst = null
  })
})
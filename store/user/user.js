import {
  observable,
  action
} from 'mobx-miniprogram'

import {
  getUserInfo
} from '@/api/my-center/myCenter'

export const userStore = observable({
  userInfo: null, //用户信息
  isUserLogin: false, //当前是否登录
  setUserInfo: action(function (userInfo) {
    this.userInfo = userInfo
    if (userInfo) {
      this.isUserLogin = true
    } else {
      this.isUserLogin = false
    }
  }),
  /**
   * 获取,更新用户信息
   */
  updateUserInfo: action(async function () {
    const {
      data: res
    } = await getUserInfo()

    // if (res.code == 200 && res.account.userName != '0_m15849353741@163.com') {
    if (res.code == 200 ) {
      this.userInfo = res.profile || res.account
      this.isUserLogin = true
    } else {
      this.userInfo = null
      this.isUserLogin = false
    }
  })
})
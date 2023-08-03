import {
  injectAppStore
}
from '@/behaviors/injectAppStore'
import {
  injectUserStore
} from '@/behaviors/injectUserStore'
import {
  manageCookie
} from '@/utils/util'
import {
  logout
} from '@/api/login/login'
import {
  getHeartbeatModeList
} from '@/api/common/common'
import Message from 'tdesign-miniprogram/message/index';
import {
  getAreaInfoById
} from '@/utils/getArea'
import {
  injectMusicPlayerStore
} from '@/behaviors/injectMusicPlayerStore'
import {
  injectCheckLogin
} from '@/behaviors/injectCheckLogin'
Page({
  behaviors: [injectAppStore, injectUserStore, injectMusicPlayerStore, injectCheckLogin],
  options: {
    styleIsolation: 'shared'
  },
  /**
   * 页面的初始数据
   */
  data: {
    infoCardTop: 40, //信息卡片的top值
    infoCardTs: false, //返回过渡效果
    areaInfo: {
      province: '',
      city: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setTabBarIndexValue(2)
    if (this.data.userInfo) {
      const {
        province,
        city
      } = this.data.userInfo
      this.setData({
        areaInfo: getAreaInfoById(province, city)
      })
    }
  },

  /**
   * 退出登录
   */
  onLogout() {
    // 清除cookie
    manageCookie('set', undefined)
    //清除用户信息
    this.clearUserInfo()
    // 发送请求
    logout()
    // 消息提示
    Message.success({
      context: this,
      align: 'center',
      offset: [20, 32],
      content: '退出成功!',
    });
  },
  /**
   * 心动模式
   */
  async onHeartbeatMode() {
    const {
      userLikedPlaylist,
      songInfo
    } = this.data
    if (!userLikedPlaylist || userLikedPlaylist.trackCount == 0) {
      wx.showToast({
        title: '"我喜欢的音乐"数量为0',
        icon: 'none'
      })
      return
    }
    if (!songInfo) {
      wx.showToast({
        title: '当前没有正在播放的歌曲',
        icon: 'none'
      })
      return
    }
    Message.info({
      align: 'center',
      offset: [20, 32],
      duration: 4000,
      icon: 'heart-filled',
      content: '正在开启心动模式!',
    });
    const {
      data
    } = await getHeartbeatModeList(songInfo.id, userLikedPlaylist.id)
    const list = data.map(item => item.songInfo)
    this.changeSongList(null, list)
    this.playTheSong(list[0].id)
  },
  /**
   * 跳转我喜欢的音乐
   */
  onToMyLikedPlaylist() {
    //可以使用游客登陆
    if (!this.checkLogin('', false)) return
    wx.navigateTo({
      url: `/packages/package-home-center/pages/playlist-display/playlist-display?playlistId=${this.data.userLikedPlaylist.id}`,
    })
  },
  /**
   * 跳转我的收藏页
   */
  onToMyCollection() {
    if (!this.checkLogin()) return
    wx.navigateTo({
      url: '/packages/package-personal-center/pages/my-collection/my-collection',
    })
  },
  /**
   * 下拉显示背景图 - 开始移动
   */
  onMoveInfoPanelStart() {
    this.setData({
      infoCardTs: false
    })
  },
  /**
   * 下拉显示背景图 - 移动中
   */
  onMoveInfoPanel(e) {
    const {
      down,
      distanceY
    } = e.detail
    if (down) {
      if (distanceY > 120) return
      this.setData({
        infoCardTop: distanceY,
      })
    }
  },
  /**
   * 下拉显示背景图 - 结束
   */
  onMoveInfoPanelEnd(e) {
    this.setData({
      infoCardTop: 0,
      infoCardTs: true
    })
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
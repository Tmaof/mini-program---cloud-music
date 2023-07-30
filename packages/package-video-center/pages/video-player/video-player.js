import {
  getMvVideoList
} from '@/api/video-center/mv-video/mvVideo'
import {
  injectSystemInfo
} from '@/behaviors/injectSystemInfo'

Page({
  behaviors: [injectSystemInfo],
  /**
   * 页面的初始数据
   */
  data: {
    videoInfoList: [
      /**
       {
         isMv: true,
         id: 1
       }
       */
    ],
    mvTotalNum: 5000,
    videoLimit: 10,
    scrollViewEle: null,
    playingIndex: 0, //当前播放的item索引
    lastScrollTop: 0,
    lastDragTime: 0, //上次拖动时间
    timeThreshold: 500, //判断为滑动快速切换的时间阈值
    firstChangeDragThreshold: 70, //快速滑动切换的阈值
    dragThreshold: 300, //滑动切换的阈值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id) {
      this.setData({
        videoInfoList: [options]
      })
    }
    this._getRandomMv()
  },
  /**
   * 获取随机MV视频
   */
  async _getRandomMv() {
    wx.showToast({
      title: '正在加载中',
      icon: 'none'
    })
    const offset = Math.round(Math.random() * (this.data.mvTotalNum - this.data.videoLimit))
    const {
      count,
      data
    } = await getMvVideoList(this.data.videoLimit, offset)
    const newList = data.map((item) => {
      return {
        id: item.id,
        isMv: true
      }
    })

    this.setData({
      mvTotalNum: count || this.data.mvTotalNum,
      videoInfoList: [...this.data.videoInfoList, ...newList]
    })

  },
  /**
   * 获取滚动视图元素
   */
  _getScrollViewEle() {
    this.createSelectorQuery().select('.video-player-container #video-scroll').node((res) => {
      const scrollViewEle = res.node
      // console.log(scrollViewEle, 'video-scroll')
      scrollViewEle.showScrollbar = false
      scrollViewEle.pagingEnabled = true
      // 取消滚动惯性 (仅在 iOS 下生效)
      scrollViewEle.decelerationDisabled = true
      this.setData({
        scrollViewEle
      })
    }).exec()
  },
  // 滑动切换视频
  onDragStart(e) {
    //启用滚动
    this.data.scrollViewEle.scrollEnabled = true
    const {
      scrollTop,
    } = e.detail
    // console.log(scrollTop, 'start')
    this.setData({
      lastScrollTop: scrollTop,
      lastDragTime: new Date().getTime()
    })
  },
  onDragEnd(e) {
    // 禁用滚动
    this.data.scrollViewEle.scrollEnabled = false
    const {
      scrollTop,
    } = e.detail
    // console.log(scrollTop, 'end')
    const distance = scrollTop - this.data.lastScrollTop
    // console.log(distance, 'distance')

    const timeInterval = new Date().getTime() - this.data.lastDragTime
    const fastChange = timeInterval < this.data.timeThreshold ? true : false
    // console.log(timeInterval, 'timeInterval')
    // 快速滚动切换
    // 滑动切换
    // 向下滑动
    if (distance > (fastChange ? this.data.firstChangeDragThreshold : this.data.dragThreshold)) {
      this.setData({
        playingIndex: this.data.playingIndex + 1
      })
    }
    // 向上滑动
    else if (distance < (fastChange ? -this.data.firstChangeDragThreshold : -this.data.dragThreshold)) {
      if (this.data.playingIndex == 0) {
        wx.showToast({
          title: '到达顶部了哟',
          icon: 'none'
        })
        return
      }
      this.setData({
        playingIndex: this.data.playingIndex - 1
      })
    }
    // console.log(this.data.playingIndex, 'index')
    // 没有滚动动画效果
    if (fastChange || this.data.playingIndex == 0) {
      this.data.scrollViewEle.scrollIntoView(`#video_${this.data.playingIndex}`)
    }
    // 有滚动动画效果
    else {
      this.data.scrollViewEle.scrollTo({
        top: this.data.playingIndex * this.data.systemInfo.windowHeight,
        animated: true
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this._getScrollViewEle()
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
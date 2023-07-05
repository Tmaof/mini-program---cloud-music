import {
  injectMusicPlayerStore
} from '@/behaviors/injectMusicPlayerStore'
Component({
  behaviors: [injectMusicPlayerStore],
  options: {
    styleIsolation: 'shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    popupVisible: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowSongList: false,
    pageTranslateY: '', //  pageTranslateY不需要时设置为空串很重要
    pageTouchMoving: false,
    discTranslateX: '',
    discTouchMoving: false, //移动过程中不需要过渡效果
    discLeftIn: false,
    discRightIn: false,
    isToCenterOk: true, //封面移动到中间再开始播放动画
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onVisibleChange(e) {
      // console.log('onVisibleChange', this.data.pageTranslateY)
      this.setData({
        popupVisible: false,
      })
    },
    onShowSongList() {
      this.setData({
        isShowSongList: true
      })
    },
    // 切换播放模式
    onSwitchMode() {
      const {
        playbackMode,
        playbackModeValues
      } = this.data
      let mode = ''
      switch (playbackMode) {
        case playbackModeValues.Sequential: {
          mode = playbackModeValues.Random
          break
        }
        case playbackModeValues.Random: {
          mode = playbackModeValues.Loop
          break
        }
        case playbackModeValues.Loop: {
          mode = playbackModeValues.Sequential
          break
        }
      }
      this.switchPlaybackModes(mode)
    },
    // 改变播放进度
    onChangeProgress(e) {
      const vlaue = e.detail.value
      this.setData({
        currentTime: vlaue
      })
      this.changeProgress(vlaue)
    },
    onPageTouchStart() {
      this.setData({
        pageTouchMoving: true
      })
    },
    // 页面上滑动
    onPageTouchMove(e) {
      // console.log(e)
      /**
      detail:
        distanceX: 33.6500244140625
      distanceY: 11.5625
      down: true
      left: false
      right: true
      up: false
      elementInfo: {
        id: "",
        dataset: {
          …},
        left: 0,
        right: 375.20001220703125,
        top: 200,
        …
      }
       */
      const info = e.detail
      // console.log('moveInfo', info)
      if (info.down) {
        this.setData({
          pageTranslateY: info.distanceY,
        })
      }
    },
    // 页面上滑动结束
    noPageTouchEnd(e) {
      // console.log(e)
      /**
      detail:
        down: true
      elementInfo: {
        id: "",
        dataset: {
          …},
        left: 0,
        right: 375.20001220703125,
        top: 200,
        …
      }
      left: false
      right: true
      touchInfo: {
        identifier: 0,
        pageX: 328,
        pageY: 332,
        clientX: 328,
        clientY: 332,
        …
      }
      up: false
       */
      const info = e.detail
      //  pageTranslateY不需要时设置为空串很重要
      if (info.elementInfo.top >= 100) {
        this.setData({
          popupVisible: false,
          pageTouchMoving: false,
          pageTranslateY: '',
        })
      } else {
        this.setData({
          pageTranslateY: '',
          pageTouchMoving: false
        })
      }
    },
    onDiscTouchStart() {
      this.setData({
        discTouchMoving: true,
        isToCenterOk: false
      })
    },
    // 唱片上滑动
    onDiscTouchMove(e) {
      const info = e.detail
      // console.log(info, 'move')
      if (info.left || info.right) {
        this.setData({
          discTranslateX: info.distanceX
        })
      }
    },
    // 唱片上滑动结束
    noDiscTouchEnd(e) {
      const info = e.detail
      // console.log(info, 'end')
      const isToRight = info.distanceX >= 60 // 向右/上一首
      const isToLeft = info.distanceX <= -60 // 向左/下一首
      if (isToRight || isToLeft) {
        // 向右/上一首
        // 向右移出
        this.setData({
          discTranslateX: isToRight ? 1000 : -1000,
          discTouchMoving: false,
        })
         // 切换歌曲
        setTimeout(() => { 
          this.switchSong(isToRight ? 'up' : 'down')
        }, 200)
        // 从左边移入
        setTimeout(() => {
          this.setData({
            discLeftIn: isToRight ? true : false,
            discRightIn: isToLeft ? true : false,
            discTranslateX: '',
          })
        }, 500);
        // 移入完成,开始播放动画
        setTimeout(() => {
          this.setData({
            isToCenterOk: true,
            discLeftIn: false,
            discRightIn: false
          })
        }, 1000)
      } else {
        this.setData({
          discTranslateX: '',
          discTouchMoving: false
        })
        setTimeout(() => {
          this.setData({
            isToCenterOk: true
          })
        }, 500);
      }
    }
  },
})
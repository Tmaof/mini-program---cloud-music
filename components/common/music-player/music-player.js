import {
  injectMusicPlayerStore
} from '@/behaviors/injectMusicPlayerStore'

import {
  likeSong
} from '@/api/common/common'

import {
  injectUserStore
} from '@/behaviors/injectUserStore'

import {
  injectCheckLogin
} from '@/behaviors/injectCheckLogin'

Component({
  behaviors: [injectMusicPlayerStore, injectUserStore, injectCheckLogin],
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
    lyricScrollEle: null, //歌词区的scroll-view 实例
    isShowLyric: false, //是否显示歌词
    isScrollLyricing: false, //是否正在滚动歌词
    isShowCommentArea: false,
    likedSongList: [], //用户喜欢的歌曲列表
    commentCount: 0, //评论数量
  },
  observers: {
    'currentLyricIndex': function () {
      this._scrollToCurrentLyrics()
    },
    'userId': function () {
      // 获取用户喜欢的音乐列表
      if (this.data.userId)
        this.getUserLikedSongIdList(this.data.userId)
    },
    'currentSongId': function (currentSongId) {
      if (!currentSongId) return
      const tid = setTimeout(() => {
        //重新获取评论数据
        this.selectComponent('#comment-area')._resetAndGetComment()
        clearTimeout(tid)
      }, 1000)
    }
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
      if (info.elementInfo.top >= 70) {
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
      // console.log('start')
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
        const tid1 = setTimeout(() => {
          this.switchSong(isToRight ? 'up' : 'down')
          clearTimeout(tid1)
        }, 200)
        // 从左边移入
        const tid2 = setTimeout(() => {
          this.setData({
            discLeftIn: isToRight ? true : false,
            discRightIn: isToLeft ? true : false,
            discTranslateX: '',
          })
          clearTimeout(tid2)
        }, 500);
        // 移入完成,开始播放动画
        const tid3 = setTimeout(() => {
          this.setData({
            isToCenterOk: true,
            discLeftIn: false,
            discRightIn: false
          })
          clearTimeout(tid3)
        }, 1000)
      } else {
        this.setData({
          discTranslateX: '',
          discTouchMoving: false
        })
        const tid = setTimeout(() => {
          this.setData({
            isToCenterOk: true
          })
          clearTimeout(tid)
        }, 500);
      }
    },
    // 显示/隐藏 歌词区
    async onChangeLyricVisibility(e) {
      const visibility = e.currentTarget.dataset.visibility
      if (visibility) {
        if (!this.data.songInfo) return
        this.changeIsNeedLyric(true)
        //更新当前歌曲歌词
        this.updateCurrentLyric()
        this.setData({
          isShowLyric: true,
        })
        this._scrollToCurrentLyrics()
      } else {
        this.changeIsNeedLyric(false)
        this.setData({
          isShowLyric: false
        })
      }

    },
    // 获取歌词区元素
    _getLyricScrollEle() {
      this.createSelectorQuery().select('#lyric-scroll').node((res) => {
        // https://developers.weixin.qq.com/miniprogram/dev/api/ui/scroll/ScrollViewContext.html
        // console.log(res.node, 'LyricScrollEle') // 节点对应的实例。
        // 不要对#lyric-scroll使用wx:if wx:else
        if (!res) return
        const lyricScrollEle = res.node
        lyricScrollEle.showScrollbar = false //不显示滚动条
        this.setData({
          lyricScrollEle
        })
      }).exec()
    },
    // 滚动到当前歌词的位置
    _scrollToCurrentLyrics() {
      //用户滚动歌词时,不进行滚动到当前歌词位置
      if (this.data.isScrollLyricing) return
      if (this.data.lyricScrollEle)
        this.data.lyricScrollEle.scrollIntoView('.lyric-item-active .auxiliary-bar')
    },
    onBinddragstart() {
      this.setData({
        isScrollLyricing: true
      })
    },
    onBinddragend() {
      const tid = setTimeout(() => {
        this.setData({
          isScrollLyricing: false
        })
        clearTimeout(tid)
      }, 3000);
    },
    /**
     * 点击跳转歌词
     */
    onJumpLyric(e) {
      const time = e.currentTarget.dataset.time
      this.changeProgress(time)
    },
    /**
     * 显示评论区
     */
    onShowCommentArea() {
      this.setData({
        isShowCommentArea: true
      })
    },
    /**
     * 喜欢/取消喜欢 歌曲
     */
    async onLikeSong(e) {
      if (!this.checkLogin('', false)) return
      const like = e.currentTarget.dataset.like
      const {
        songInfo,
        userLikedSongIdList
      } = this.data
      const {
        code
      } = await likeSong(songInfo.id, like)
      if (code == 200) {
        this.setSongInfo({
          ...this.data.songInfo,
          liked: like
        })

        let list = null
        if (like) {
          list = [...userLikedSongIdList, songInfo.id]
        } else {
          list = userLikedSongIdList.filter(id => id != songInfo.id)
        }
        this.setUserLikedSongIdList(list)
      }
    },
    onCommentCountChange(e) {
      this.setData({
        commentCount: e.detail
      })
    }
  },

  lifetimes: {
    attached() {
      this._getLyricScrollEle()
    },
    ready() {}
  }
})
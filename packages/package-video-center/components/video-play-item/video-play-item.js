import {
  getMvDetail,
  getMvDynamic,
  getMvUrl
} from '@/packages/package-video-center/api/video-player/videoPlayer'

import {
  injectSystemInfo
} from '@/behaviors/injectSystemInfo'

Component({
  behaviors: [injectSystemInfo],
  options: {
    styleIsolation: 'shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    videoInfo: {
      type: Object,
      value: null
    },
    // 是否播放视频
    isPlayVideo: {
      type: Boolean,
      value: false,
    },
    currentIndex: {
      type: Number,
      value: 0
    },
    playingIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    videoDetail: null,
    videoDynamicInfo: null,
    videoUrl: '',
    videoHeight: '', //视频高度 px
    activeValues: [-1],
    videoEle: null, //video元素
    currentTime: 0, //视频播放器播放进度
    duration: 0,
    isChangeProgressing: false, //正在改变进度条
    isShowVideoControls: false, //是否显示视频播放控件
  },

  observers: {
    // 监听数据变化,播放/暂停视频
    'isPlayVideo': function (val) {
      if (!this.data.videoEle) return
      if (val) {
        this.data.videoEle.play()
      } else {
        this.data.videoEle.pause()
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _geMvInfo() {
      const id = this.data.videoInfo.id
      getMvDetail(id).then(({
        data
      }) => {
        // console.log(data)
        this.setData({
          videoDetail: data
        })
      })
      getMvDynamic(id).then(res => {
        this.setData({
          videoDynamicInfo: res
        })
      })
      getMvUrl(id).then(({
        data
      }) => {
        this.setData({
          videoUrl: data.url
        })
      })
    },
    handleChange(e) {
      this.setData({
        activeValues: e.detail.value,
      });
    },
    _getVideoEle() {
      const videoEle = wx.createVideoContext('' + this.data.videoInfo.id, this)
      // console.log(videoEle)
      this.setData({
        videoEle
      })
    },
    onChangeIsPlayVideo() {
      this.setData({
        isPlayVideo: this.data.isPlayVideo ? false : true
      })
    },
    // 播放进度改变
    onTimeUpdate(e) {
      const {
        currentTime,
        duration
      } = e.detail
      this.setData({
        currentTime,
        duration
      })
    },
    // 改变播放进度
    onProgressChangeStart() {
      this.data.videoEle.pause()
      this.setData({
        isChangeProgressing: true
      })
    },
    onProgressChange(e) {
      this.setData({
        currentTime: e.detail.value, //进度条跟着改变
      })
    },
    onProgressChangeEnd() {
      this.data.videoEle.seek(this.data.currentTime)
      this.data.videoEle.play()
      this.setData({
        isChangeProgressing: false
      })
    },
    // 点击全屏
    onFullScreen() {
      this.data.videoEle.requestFullScreen()
    },
    // 全屏状态改变
    onFullScreenChange(e) {
      const {
        fullScreen,
        direction
      } = e.detail
      this.setData({
        isShowVideoControls: fullScreen ? true : false
      })
    },
    //视频元数据加载完成时触发。event.detail = {width, height, duration}
    onLoadedmetadata(e) {
      const {
        width,
        height,
      } = e.detail
      this.setData({
        videoHeight: (height / width) * this.data.systemInfo.windowWidth
      })

    },
    // 阻止事件传递
    onBlockingEvent() {
      return false
    }
  },
  lifetimes: {
    attached() {
      if (this.data.videoInfo.isMv) {
        this._geMvInfo()
      } else {

      }
      this._getVideoEle()
      // 头像scroll-view隐藏滚动条
      this.createSelectorQuery().select('#profile-photo-scroll-view').node((res) => {
        res.node.showScrollbar = false
      }).exec()

    }
  }
})
import {
  likeResource
} from '@/api/common/common'
import {
  injectCheckLogin
} from '@/behaviors/injectCheckLogin'
import {
  getVideoUrl
} from '@/api/video-center/commend-video/commendVideo'
Component({
  behaviors: [injectCheckLogin],
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isPlaying: {
      type: Boolean,
      value: false,
    }, //是否播放视频
    videoInfo: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点赞视频
    async onLikeVideo(e) {
      if (!this.checkLogin()) return
      const like = e.currentTarget.dataset.like
      const {
        videoInfo
      } = this.data
      const type = videoInfo.type == 0 ? 1 : 5
      const {
        code
      } = await likeResource(videoInfo.data.vid, type, like ? 1 : 0)
      if (code == 200) {
        this.setData({
          'videoInfo.data.praisedCount': videoInfo.data.praisedCount + (like ? 1 : -1),
          'videoInfo.data.praised': like
        })
      }
    },
    //跳转视频播放器页面
    onToVideoPlayer(e) {
      const {
        videoInfo
      } = this.data
      const isMv = videoInfo.type == 0 ? true : false
      wx.navigateTo({
        url: `/packages/package-video-center/pages/video-player/video-player?isMv=${isMv}&id=${videoInfo.data.vid}`,
      })
    },
    /**
     * 获取视频url
     */
    async _getVideoUrl() {
      const {
        videoInfo
      } = this.data
      if (videoInfo.data.urlInfo) return
      const {
        urls
      } = await getVideoUrl(videoInfo.data.vid)
      this.setData({
        'videoInfo.data.urlInfo': {
          url: urls[0].url
        }
      })
    }
  },
  lifetimes: {
    attached() {
      this._getVideoUrl()
    }
  }
})
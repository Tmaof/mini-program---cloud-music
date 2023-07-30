import {
  getCommendVideoList,
  getAllVideo,
  getVideoGroup,
  getVideoByGroupId
} from '@/api/video-center/commend-video/commendVideo'


Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    commendVideoList: [],
    hasmore: true,
    isLoading: false,
    offset: 0,
    playingIndex: 0,
    videoGroupList: [], //视频分类标签
  },
  lifetimes: {
    attached() {
      // this._addCommendVideo()
      this._getRamdomVideo()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 添加推荐视频
     */
    async _addCommendVideo() {
      this.setData({
        isLoading: true,
        offset: this.data.commendVideoList.length
      })
      const {
        hasmore,
        datas
      } = await getAllVideo(this.data.offset)
      this.setData({
        hasmore,
        commendVideoList: [...this.data.commendVideoList, ...datas],
        isLoading: false,
      })
    },
    /**
     * 获取随机视频
     */
    async _getRamdomVideo() {
      this.setData({
        isLoading: true
      })
      let {
        videoGroupList,
        commendVideoList
      } = this.data
      if (!videoGroupList.length) {
        const {
          data
        } = await getVideoGroup()
        videoGroupList = data
        this.setData({
          videoGroupList: data
        })
      }

      const randomId = videoGroupList[Math.round(Math.random() * (videoGroupList.length - 1))].id
      const {
        datas
      } = await getVideoByGroupId(randomId)
      this.setData({
        commendVideoList: [...commendVideoList, ...datas],
        isLoading: false,
        videoGroupList: videoGroupList.filter(item => item.id != randomId)
      })
    },
    onDragend(e) {
      const {
        scrollTop
      } = e.detail

      this.setData({
        playingIndex: Math.round(scrollTop / 270)
      })
    },
    onScrolltolower() {
      // if (this.data.isLoading || !this.data.hasmore) return
      // this._addCommendVideo()

      if (this.data.isLoading) return
      this._getRamdomVideo()
    }
  }
})
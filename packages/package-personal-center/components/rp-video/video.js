import {
  getRPvideo,
  mlogIdToVideoId
} from '@/packages/package-personal-center/api/recent-play/recentPlay'

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
    videoInfo: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async _getRPvideo() {
      const {
        data
      } = await getRPvideo()
      //mlog id 转 视频ID
      for (let i = 0; i < data.list.length; i++) {
        const item = data.list[i]
        if (item.resourceType == 'MLOG') {
          const {
            data
          } = await mlogIdToVideoId(item.resourceId)
          item.resourceId = data
        }
      }
      this.setData({
        videoInfo: data
      })
    }
  },

  lifetimes: {
    attached() {
      this._getRPvideo()
    }
  }
})
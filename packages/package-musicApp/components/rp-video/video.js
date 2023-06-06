import {
  getRPvideo
} from '@/api/my-center/recent-play/recentPlay'

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
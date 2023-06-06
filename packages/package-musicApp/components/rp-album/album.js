import {
  getRPalbum
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
    albumInfo: {
      total: 0,
      list: []
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async _getRPalbum() {
      const {
        data
      } = await getRPalbum()
      this.setData({
        albumInfo: data
      })
    }
  },
  lifetimes: {
    attached() {
      this._getRPalbum()
    }
  }
})
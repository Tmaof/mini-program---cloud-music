import {
  getRPplaylist
} from '@/packages/package-personal-center/api/recent-play/recentPlay'

Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    songListInfo: {
      total: 0,
      list: []
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
    async _getRPplaylist() {
      const {
        data
      } = await getRPplaylist()
      this.setData({
        songListInfo: data
      })
    }
  },
  lifetimes: {
    attached() {
      this._getRPplaylist()
    }
  }
})
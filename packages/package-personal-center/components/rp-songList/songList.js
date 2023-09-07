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
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    isLoading: false,
    songListInfo: {
      total: 0,
      list: []
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async _getRPplaylist() {
      this.setData({
        isLoading: true
      })
      const {
        data
      } = await getRPplaylist()
      if (data)
        this.setData({
          songListInfo: data,
          isLoading: false
        })
    }
  },
  lifetimes: {
    attached() {
      this._getRPplaylist()
    }
  }
})
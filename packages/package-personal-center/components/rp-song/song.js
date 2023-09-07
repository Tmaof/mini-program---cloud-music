import {
  getRPsong
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
    songList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async _getSongList() {
      this.setData({
        isLoading: true
      })
      const {
        data
      } = await getRPsong()
      if (data && Array.isArray(data.list)) {
        this.setData({
          songList: data.list.map(item => item.data)
        })
      }
      this.setData({
        isLoading: false
      })
    }
  },

  // 生命周期
  lifetimes: {
    attached() {
      this._getSongList()
    }
  }
})
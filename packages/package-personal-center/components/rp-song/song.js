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
  properties: {
    songList: []
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
    async _getSongList() {
      const {
        data
      } = await getRPsong()
      this.setData({
        songList: data.list.map(item => item.data)
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
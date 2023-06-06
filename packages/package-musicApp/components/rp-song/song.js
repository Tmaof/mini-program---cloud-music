import {
  getRPsong
} from '@/api/my-center/recent-play/recentPlay'

Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    songInfo: {
      total: 0,
      list: []
    } //歌曲列表信息对象
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
        songInfo: data
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
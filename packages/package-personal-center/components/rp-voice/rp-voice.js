import {
  getRPvoice
} from '@/packages/package-personal-center/api/recent-play/recentPlay'


Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    voiceList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async _getRPvoice() {
      const {
        data
      } = await getRPvoice()
      this.setData({
        voiceList: data.list.map(item => item.data.pubDJProgramData)
      })
    }
  },
  lifetimes: {
    attached() {
      this._getRPvoice()
    }
  }
})
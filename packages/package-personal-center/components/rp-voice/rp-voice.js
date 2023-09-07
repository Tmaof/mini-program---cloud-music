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
    voiceList: [],
    isLoading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async _getRPvoice() {
      this.setData({
        isLoading: true
      })
      const {
        data
      } = await getRPvoice()
      this.setData({
        voiceList: data.list.map(item => item.data.pubDJProgramData),
        isLoading: false
      })
    }
  },
  lifetimes: {
    attached() {
      this._getRPvoice()
    }
  }
})
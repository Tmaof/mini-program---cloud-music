import {
  getSearchResult
} from '@/packages/package-home-center/api/search-center/searchCenter'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    keyword: String
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
    async _getData() {
      this.setData({
        isLoading: true
      })
      const {
        data
      } = await getSearchResult(this.data.keyword, 2000)
      this.setData({
        voiceList: data.resources.map(item => item.baseInfo),
        isLoading: false
      })
    },
    _clearData() {
      this.setData({
        voiceList: []
      })
    }
  }
})
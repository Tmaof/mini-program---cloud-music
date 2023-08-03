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
    djList: [],
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
        result
      } = await getSearchResult(this.data.keyword, 1009)
      this.setData({
        djList: result.djRadios,
        isLoading: false
      })
    },
    _clearData() {
      this.setData({
        djList: []
      })
    }
  }
})
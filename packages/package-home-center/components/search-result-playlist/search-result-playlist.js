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
    playlistList: [],
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
      } = await getSearchResult(this.data.keyword, 1000)
      this.setData({
        playlistList: result.playlists,
        isLoading: false
      })
    },
    _clearData() {
      this.setData({
        playlistList: []
      })
    }
  }
})
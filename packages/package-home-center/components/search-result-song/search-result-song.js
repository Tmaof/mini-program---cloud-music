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
    songList: [],
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
      } = await getSearchResult(this.data.keyword, 1)
      this.setData({
        songList: result.songs.map(item => {
          item.djId = 0
          //该数据中没有歌曲封面，临时替代
          item.coverUrl = item.album.artist.img1v1Url
          return item
        }),
        isLoading: false
      })
    },
    _clearData() {
      this.setData({
        songList: []
      })
    }
  }
})
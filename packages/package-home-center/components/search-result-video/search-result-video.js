import {
  getSearchResult
} from '@/packages/package-home-center/api/search-center/searchCenter'

Component({
  options: {
    styleIsolation: 'apply-shared'
  },
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
    videoList: [],
    mvList: [],
    isLoadingMv: false,
    isLoadingVideo: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _getData() {
      this.setData({
        isLoadingMv: true,
        isLoadingVideo: true
      })
      getSearchResult(this.data.keyword, 1014).then(({
        result
      }) => {
        this.setData({
          videoList: result.videos,
          isLoadingVideo: false
        })
      })
      getSearchResult(this.data.keyword, 1004).then(({
        result
      }) => {
        this.setData({
          mvList: result.mvs,
          isLoadingMv: false
        })
      })
    },
    _clearData() {
      this.setData({
        mvList: [],
        videoList: []
      })
    }
  }
})
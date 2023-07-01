import {
  getMvVideoList
} from '@/api/video-center/mv-video/mvVideo'

Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    mvVideoList: [],
    offset: 0,
    limit: 20,
  },
  lifetimes: {
    attached() {
      this._loadMore()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    async _loadMore() {
      const {
        data
      } = await getMvVideoList(this.data.limit, this.data.offset)

      this.setData({
        mvVideoList: [...this.data.mvVideoList, ...data||[]],
        offset: this.data.offset + this.data.limit
      })
    }
  }
})
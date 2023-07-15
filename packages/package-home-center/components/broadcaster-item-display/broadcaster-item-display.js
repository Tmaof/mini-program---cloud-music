import {
  getDjListByCate
} from '@/packages/package-home-center/api/broadcaster-tags/broadcasterTags'

Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 分类id
    cateId: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    djList: [],
    totalNums: 0,
    limit: 30,
    offset: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async _getDjList() {
      if (this.data.offset - this.data.limit > this.data.totalNums) {
        wx.showToast({
          title: '没有更多了呦',
          icon: 'none'
        })
        return
      }
      const {
        djRadios,
        count
      } = await getDjListByCate(this.data.cateId, this.data.limit, this.data.offset)
      this.setData({
        totalNums: count,
        djList: [...this.data.djList, ...djRadios],
        offset: this.data.offset + this.data.limit
      })
    }
  },
  lifetimes: {
    ready() {
      this._getDjList()
    }
  }
})
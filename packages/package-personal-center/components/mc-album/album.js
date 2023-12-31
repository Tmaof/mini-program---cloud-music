import {
  getMCalbum
} from '@/packages/package-personal-center/api/my-collection/myCollection'

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
    isLoading: false,
    albumInfo: {
      count: 0,
      data: []
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async _getMCalbum() {
      this.setData({
        isLoading: true
      })
      const res = await getMCalbum()
      this.setData({
        albumInfo: res,
        isLoading: false
      })
    }
  },
  lifetimes: {
    attached() {
      this._getMCalbum()
    }
  }
})
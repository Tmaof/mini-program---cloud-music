import {
  getMCalbum
} from '@/api/my-center/my-collection/myCollection'

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
      const res = await getMCalbum()
      this.setData({
        albumInfo: res
      })
    }
  },
  lifetimes: {
    attached() {
      this._getMCalbum()
    }
  }
})
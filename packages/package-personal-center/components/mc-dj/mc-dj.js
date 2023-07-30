import {
  getMCdj
} from '@/packages/package-personal-center/api/my-collection/myCollection'

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
    djList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async _getMCdj() {
      const {
        djRadios
      } = await getMCdj()
      this.setData({
        djList: djRadios
      })
    }
  },
  lifetimes: {
    attached() {
      this._getMCdj()
    }
  }
})
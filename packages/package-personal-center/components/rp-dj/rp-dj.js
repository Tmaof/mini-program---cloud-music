import {
  getRPdj
} from '@/packages/package-personal-center/api/recent-play/recentPlay'

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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    async _getRPdj() {
      const res = await getRPdj()
    }
  },
  lifetimes: {
    attached() {
      this._getRPdj()
    }
  }
})
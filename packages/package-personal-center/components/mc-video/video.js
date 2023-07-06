import {
  getMCmv
} from '@/packages/package-personal-center/api/my-collection/myCollection'


Component({
  options: {
    styleIsolation: 'shared'
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
    MCmvInfo: {
      data: [],
    }, //收藏的视频
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async _getMCmv() {
      const data = await getMCmv()
      this.setData({
        MCmvInfo: data
      })
    },

  },
  lifetimes: {
    attached() {
      this._getMCmv()
    }
  }
})
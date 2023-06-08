import {
  injectUserStore
} from '@/behaviors/injectUserStore'

Component({
  behaviors: [injectUserStore],
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
    manageSongListData: {
      title: '歌单管理',
      iconClass: 'icon-menu'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached() {},
  }
})
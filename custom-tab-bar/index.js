// custom-tab-bar/index.js
import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings'
import {
  appStore
} from '../store/app/app'
import {
  test
} from '@/api/home/home'

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store: appStore,
    fields: {
      tabBarIndexValue: 'tabBarIndexValue',
    },
    actions: {
      setTabBarIndexValue: 'setTabBarIndexValue'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    list: [{
        icon: "home",
        ariaLabel: "首页",
        path: '/pages/TB-home/home'
      },
      {
        icon: "video",
        ariaLabel: "视频",
        path: '/pages/TB-video/video'
      },
      {
        icon: "user",
        ariaLabel: "我的",
        path: '/pages/TB-personal-center/personal-center'
      },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      // 改变当前索引
      this.setTabBarIndexValue(e.detail.value)
      // 路由跳转
      const url = this.data.list[e.detail.value].path
      wx.switchTab({
        url
      })
    },
  },
  lifetimes: {
    async attached() {
    }
  }
});
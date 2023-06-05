import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import {
  appStore
} from '@/store/app/app'


export const injectAppStore = Behavior({
  data: {

  },
  lifetimes: {
    attached() {
      this.storeBindings = createStoreBindings(this, {
        store: appStore,
        fields: ['tabBarIndexValue'],
        actions: ['setTabBarIndexValue']
      })
    },

    /**
     * 监听页面卸载
     */
    detached() {
      this.storeBindings.destroyStoreBindings()
    }
  }
})
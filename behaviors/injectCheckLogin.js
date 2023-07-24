import {
  userStore
} from '@/store/user/user'
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'

export const injectCheckLogin = Behavior({
  lifetimes: {
    attached() {
      this.storeBindings = createStoreBindings(this, {
        store: userStore,
        actions: ['checkLogin']
      })
    },
    detached() {
      this.storeBindings.destroyStoreBindings()
    }
  }
})
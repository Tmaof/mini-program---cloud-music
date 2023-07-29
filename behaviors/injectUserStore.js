import {
  userStore
} from '@/store/user/user'
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'

export const injectUserStore = Behavior({
  lifetimes: {
    attached() {
      this.storeBindings = createStoreBindings(this, {
        store: userStore,
        fields: ['userInfo', 'userId', 'isUserLogin', 'isVisitor',
          'collectedPlaylist', 'userLikedPlaylist',
        ],
        actions: ['setUserInfo', 'updateUserInfo', 'clearUserInfo']
      })
    },
    detached() {
      this.storeBindings.destroyStoreBindings()
    }
  }
})
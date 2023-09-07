import {
  observable,
  action
} from 'mobx-miniprogram'

export const appStore = observable({
  tabBarIndexValue: 0,
  setTabBarIndexValue: action(function (value) {
    if (value)
      this.tabBarIndexValue = value
  })
})
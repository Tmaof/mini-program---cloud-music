import {
  observable,
  action
} from 'mobx-miniprogram'

export const appStore = observable({
  tabBarIndexValue: 0,
  setTabBarIndexValue: action(function (value) {
    this.tabBarIndexValue = value
  })
})
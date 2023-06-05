import request from '@/utils/request'
import {
  manageCookie
} from '@/utils/util'

/**
 * 登录后,根据cookie获取用户信息
 */
export function getUserInfo() {
  return request({
    // url: `/login/status?timestamp=${Date.now()}`,
    url: `/login/status`,
    method: 'post',
    data: {
      cookie: manageCookie('get')
    }
  })
}
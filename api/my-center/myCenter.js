import { request } from '@/utils/request'

/**
 * 登录后,根据cookie获取用户信息
 */
export function getUserInfo() {
  return request({
    url: `/login/status`,
    method: 'post'
  })
}
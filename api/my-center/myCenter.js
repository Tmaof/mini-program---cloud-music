import {
  request
} from '@/utils/request'

/**
 * 登录后,根据cookie获取用户信息
 */
export function getUserInfo() {
  return request({
    url: `/login/status`,
    method: 'post'
  })
}

/**
 * 获取收藏的歌单
 * @param uid 用户ID
 */
export function getCollectSongList(uid) {
  return request({
    url: `/user/playlist?uid=${uid}`,
    method: 'POST'
  })
}
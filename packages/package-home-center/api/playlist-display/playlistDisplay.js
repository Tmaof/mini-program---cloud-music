import {
  request
} from '@/utils/request'

/**
 * 获取歌单详情
 * @param {*} id 
 */
export function getPlaylistDetail(id) {
  return request({
    url: `/playlist/detail?id=${id}`
  })
}

/**
 * 获取歌单详情动态
 * @param {*} id 
 */
export function getPlaylistDynamic(id) {
  return request({
    url: `/playlist/detail/dynamic?id=${id}`,
    method:'POST'
  })
}

/**
 * 收藏/取消收藏歌单
 * @param {*} id 歌单ID
 * @param {*} t 1:收藏,2:取消收藏
 */
export function subscribePlaylist(id, t) {
  return request({
    url: '/playlist/subscribe',
    method: 'POST',
    data: {
      id,
      t
    }
  })
}
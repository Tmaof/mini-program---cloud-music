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
    url: `/playlist/detail/dynamic?id=${id}`
  })
}


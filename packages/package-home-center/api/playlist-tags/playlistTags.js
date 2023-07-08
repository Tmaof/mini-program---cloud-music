import { request } from '@/utils/request'

/**
 * 获取歌单分类列表
 */
export function getPlaylistCategory() {
  return request({
    url: '/playlist/catlist'
  })
}
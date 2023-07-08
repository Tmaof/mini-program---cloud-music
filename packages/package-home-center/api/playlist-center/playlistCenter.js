import { request } from '@/utils/request'

/**
 * 获取热门歌单分类
 */
export function getTopPlaylistCategory() {
  return request({
    url: '/playlist/hot',
  })
}

/**
 * 根据歌单标签获取精选歌单
 */
export function getPlaylistByCategoryTags(cat,limit,offset) {
  return request({
    url: '/top/playlist',
    data: {
      cat,
      limit,
      offset,
    }
  })
}
import {
  request
} from '@/utils/request'

/**
 * 根据歌单ID获取歌曲列表
 */
export function getSongListByPlaylistId(id, limit = 30, offset = 0) {
  return request({
    url: `/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`
  })
}
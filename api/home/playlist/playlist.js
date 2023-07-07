import {
  request
} from '@/utils/request'

/**
 * 根据歌单ID, 获取歌单中的所有歌曲
 * @param {*} id 
 * @param {*} limit 可选
 * @param {*} offset 可选
 */
export function getSongListByPlaylistId(id, limit, offset) {
  return request({
    url: `/playlist/track/all`,
    data: {
      id,
      limit,
      offset
    }
  })
}
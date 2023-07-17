import {
  request
} from '@/utils/request'

export function getSongLyric(songId) {
  return request({
    url: '/lyric',
    data: {
      id: songId
    }
  })
}
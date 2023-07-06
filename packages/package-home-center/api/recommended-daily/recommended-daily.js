import {
  request
} from '@/utils/request'

/**
 * 获取每日推荐歌曲
 */
export function getDailyRecommendedSongs() {
  return request({
    url: '/recommend/songs',
    method: 'POST'
  })
}
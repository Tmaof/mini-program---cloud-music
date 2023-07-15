import {
  request
} from '@/utils/request'

/**
 * 获取今日优选电台
 */
export function getTodayPerferedDj() {
  return request({
    url: '/dj/today/perfered'
  })
}

/**
 * 获取推荐的电台
 */
export function getRecommendDj() {
  return request({
    url: '/dj/recommend'
  })
}

/**
 * 获取热门电台
 */
export function getHotDj(limit, offset) {
  return request({
    url: '/dj/hot',
    data: {
      limit,
      offset
    }
  })
}
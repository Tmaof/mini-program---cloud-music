
import { request } from '@/utils/request'

/**
 * 获取推荐的视频 10条
 */
export function getCommendVideoList() {
  return request({
    url: '/video/timeline/recommend?offset=10'
  })
}
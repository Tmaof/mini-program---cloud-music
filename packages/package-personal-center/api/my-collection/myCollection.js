import {
  request
} from '@/utils/request'
/**
 * 获取我收藏的MV
 */
export function getMCmv() {
  return request({
    url: '/mv/sublist',
    method: 'post'
  })
}

/**
 * 获取我点赞的视频
 */
export function getMCmylike() {
  return request({
    url: '/playlist/mylike',
    method: 'post'
  })
}

/**
 * 获取我收藏的视频
 */
export function getMCalbum() {
  return request({
    url: '/album/sublist',
    method: 'POST'
  })
}

/**
 * 获取我收藏的电台
 */
export function getMCdj() {
  return request({
    url: '/dj/sublist',
    method: 'POST'
  })
}
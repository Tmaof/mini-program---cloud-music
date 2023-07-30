import {
  request
} from '@/utils/request'

/**
 * 获取推荐的视频
 */
export function getCommendVideoList(offset) {
  return request({
    url: '/video/timeline/recommend',
    method: 'POST',
    data: {
      offset
    }
  })
}

/**
 * 获取全部视频列表
 * @param {*} offset 
 */
export function getAllVideo(offset) {
  return request({
    url: '/video/timeline/all',
    method: 'POST',
    data: {
      offset
    }
  })
}

/**
 * 获取视频标签列表
 */
export function getVideoGroup() {
  return request({
    url: '/video/group/list',
  })
}

/**
 * 获取视频根据标签或者分类ID
 */
export function getVideoByGroupId(id) {
  return request({
    url: '/video/group',
    method: 'POST',
    data: {
      id
    }
  })
}
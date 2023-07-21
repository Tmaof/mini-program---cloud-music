import {
  request
} from '@/utils/request'

/**
 * 获取 mv 数据
 */
export function getMvDetail(mvid) {
  return request({
    url: '/mv/detail',
    data: {
      mvid
    }
  })
}

/**
 * 获取mv点赞转发评论数数据
 */
export function getMvDynamic(mvid) {
  return request({
    url: '/mv/detail/info',
    data: {
      mvid
    }
  })
}

/**
 * 获取mv播放地址
 * @param {*} id 
 */
export function getMvUrl(id) {
  return request({
    url: '/mv/url',
    data: {
      id,
      r: 720
    }
  })
}
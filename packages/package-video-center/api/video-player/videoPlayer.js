import {
  request
} from '@/utils/request'

/**
 * 获取 mv 数据
 */
export function getMvDetail(mvid) {
  return request({
    url: '/mv/detail',
    method: 'POST',
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
    method: 'POST',
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

/**
 * 收藏mv
 * @param {*} mvid 
 * @param {*} t 1 为收藏,其他为取消收藏
 */
export function subscribeMv(mvid, t) {
  return request({
    url: '/mv/sub',
    method: 'POST',
    data: {
      mvid,
      t
    }
  })
}

/**
 * 获取 视频 数据
 */
export function getVideoDetail(id) {
  return request({
    url: '/video/detail',
    data: {
      id
    }
  })
}

/**
 * 获取 视频 点赞转发评论数数据
 */
export function getVideoDynamic(vid) {
  return request({
    url: '/video/detail/info',
    method: 'POST',
    data: {
      vid
    }
  })
}

/**
 * 获取mv播放地址
 * @param {*} id 
 */
export function getVideoUrl(id) {
  return request({
    url: '/video/url',
    data: {
      id,
    }
  })
}

/**
 * 收藏视频
 * @param {*} id 
 * @param {*} t 1 为收藏,其他为取消收藏
 */
export function subscribeVideo(id, t) {
  return request({
    url: '/video/sub',
    method: 'POST',
    data: {
      id,
      t
    }
  })
}
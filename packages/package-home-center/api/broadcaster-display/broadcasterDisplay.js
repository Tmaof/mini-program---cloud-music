import {
  request
} from '@/utils/request'

/**
 * 获取电台详情
 * @param {*} rid 
 */
export function getDjDetail(rid) {
  return request({
    url: '/dj/detail',
    method:'POST',
    data: {
      rid
    }
  })
}

/**
 * 获取电台节目列表
 * @param {*} limit 
 * @param {*} offset 
 * @param {*} asc 
 */
export function getDjProgram(rid, limit, offset, asc = false) {
  return request({
    url: '/dj/program',
    data: {
      rid,
      limit,
      offset,
      asc
    }
  })
}

/**
 * 收藏/取消收藏电台
 * @param {*} id 电台ID
 * @param {*} t 1:收藏,0:取消收藏
 */
export function subscribeDj(rid, t) {
  return request({
    url: '/dj/sub',
    method: 'POST',
    data: {
      rid,
      t
    }
  })
}
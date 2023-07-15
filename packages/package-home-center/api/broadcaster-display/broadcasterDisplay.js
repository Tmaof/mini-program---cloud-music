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
export function getDjProgram(rid,limit, offset, asc = false) {
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
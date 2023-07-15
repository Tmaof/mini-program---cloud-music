import { request } from '@/utils/request'

/**
 * 获取电台的分类列表
 */
export function getCateList() {
  return request({
    url: '/dj/catelist'
  })
}

/**
 * 根据分类类型获取电台列表
 * @param {*} cateId 
 * @param {*} limit 
 * @param {*} offset 
 */
export function getDjListByCate(cateId,limit,offset) {
  return request({
    url: '/dj/radio/hot',
    data: {
      cateId,
      limit,
      offset
    }
  })
}
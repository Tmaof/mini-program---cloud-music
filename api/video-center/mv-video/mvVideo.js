import {
  request
} from '@/utils/request'

/**
 * 获取mv
 * @param {number} offset 分页偏移量
 * @param {number} limit 每页数量
 */
export function getMvVideoList(limit=30,offset = 0) {
  return request({
    url: `/mv/all?order=最热&offset=${offset}&limit=${limit}`
  })
}
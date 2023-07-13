import { request } from '@/utils/request'

export function getToplistInfo() {
  return request({
    url: '/toplist'
  })
}
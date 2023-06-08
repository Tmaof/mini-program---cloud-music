import {
  areaList
} from '@/data/area.js'

/**
 * 获取省份列表
 * 
 */
export function getProvince() {
  return areaList.map(item => ({
    value: item.id,
    label: item.name
  }))
}

/**
 * 获取城市列表
 * @param {*} pid 省份的id
 */
export function getCity(pid) {
  try {
    const {
      cities
    } = areaList.find((item) => item.id == pid)
    return Object.keys(cities).map(key => ({
      value: key,
      label: cities[key]
    }))
  } catch (e) {
    return []
  }
}
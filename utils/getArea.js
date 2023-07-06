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

/**
 * 根据ID获取地区信息
 * @param {*} pid 省份ID
 * @param {*} cid 城市ID
 * @returns { {province:string,city:string} } ret
 */
export function getAreaInfoById(pid, cid) {
  const ret = {
    province: '',
    city:''
  }
  const province = areaList.find(item => item.id == pid)
  if (province) {
    ret.province = province.name
    ret.city = province.cities[cid]
  }
  return ret
}
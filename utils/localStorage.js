/**
 * 获取存储
 * @param {*} key 
 */
export function getItem(key) {
 return wx.getStorageSync(key)
}

/**
 *设置存储
 * @param {*} key 
 * @param {*} data 
 */
export function setItem(key, data) {
  wx.setStorageSync(key, data)
}

/**
 * 删除存储
 * @param {*} key 
 */
export function removeItem(key) {
  wx.removeStorageSync(key)
}
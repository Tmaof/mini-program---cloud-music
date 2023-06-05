import {
  getItem,
  setItem
} from './localStorage'
import config from '@/config/config'

/**
 * 管理cookie
 * @param {'get'|'set'} method 
 * @param {*} cookie 
 */
export function manageCookie(method, cookie) {
  if (method == 'set') {
    setItem(config.cookieKey, cookie)
  }
  if (method == 'get') {
    return getItem(config.cookieKey)
  }
}
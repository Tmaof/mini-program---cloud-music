import {
  request
} from '@/utils/request'

/**
 * 获取最近播放的歌曲
 */
export function getRPsong() {
  return request({
    url: '/record/recent/song',
    method: 'post'
  })
}

/**
 * 获取最近播放的视频
 */
export function getRPvideo() {
  return request({
    url: `/record/recent/video`,
    method: 'post'
  })
}

/**
 * 获取最近播放的歌单
 */
export function getRPplaylist() {
  return request({
    url: `/record/recent/playlist`,
    method: 'post'
  })
}

/**
 * 获取最近播放的专辑
 */
export function getRPalbum() {
  return request({
    url: `/record/recent/album`,
    method: 'post'
  })
}

/**
 * 获取最近播放的声音
 */
export function getRPvoice() {
  return request({
    url: '/record/recent/voice',
    method: 'POST',
  })
}

/**
 * 获取最近播放的播客
 */
export function getRPdj() {
  return request({
    url: '/record/recent/dj',
    method: 'POST',
  })
}
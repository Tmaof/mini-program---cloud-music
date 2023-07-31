import {
  request
} from '@/utils/request'

/**
 * 获取歌词
 * @param {*} songId 
 */
export function getSongLyric(songId) {
  return request({
    url: '/lyric',
    data: {
      id: songId
    }
  })
}

/**
 * 
 * @param {*} id 资源 id
 * @param {*} type 资源类型
 * @param {*} t 操作,1 为点赞,其他为取消点赞
 */
export function likeResource(id, type, t) {
  return request({
    url: '/resource/like',
    method: 'POST',
    data: {
      id,
      type,
      t
    }
  })
}

/**
 * 喜欢歌曲
 * @param {*} id 
 * @param {*} like 
 */
export function likeSong(id, like) {
  return request({
    url: '/like',
    method: 'POST',
    data: {
      id,
      like
    }
  })
}

/**
 * 获取喜欢音乐列表
 * @param {*} uid 用户ID
 */
export function getLikeSongList(uid) {
  return request({
    url: '/likelist',
    method:'POST',
    data: {
      uid
    }
  })
}
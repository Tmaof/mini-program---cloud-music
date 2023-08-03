import {
  request
} from '@/utils/request'

import {
  getSongListByPlaylistId
} from '@/api/home/playlist/playlist'

/**
 * 获取轮播图
 */
export function getBannerList() {
  return request({
    url: '/banner?type=1'
  })
}
/**
 * 获取推荐歌单
 */
export function getRecommendedPlaylists(limit = 30) {
  return request({
    url: '/personalized',
    data: {
      limit,
    }
  })
}

/**
 * 获取榜单
 * @param {*} start 第一个榜单的位置
 * @param {*} end 最后一个榜单的位置
 * @param {*} itemLimit 每一个榜单的歌曲数
 */
export async function getTheList(start, end, itemLimit) {
  let {
    list
  } = await request({
    url: '/toplist',
  })
  // 取前n个榜单
  list = list.slice(start || 0, end || list.length)
  // 根据id 获取榜单详细数据
  const retList = []
  for (const item of list) {
    const {
      songs
    } = await getSongListByPlaylistId(item.id)
    retList.push({
      id: item.id,
      name: item.name,
      tracks: songs.slice(0, itemLimit || songs.length) //取前n个
    })
  }
  return retList;
}

/**
 * 获取热搜列表(简略)
 */
export function getRefHotSearcheList() {
  return request({
    url: '/search/hot',
  })
}
import {
  request
} from '@/utils/request'

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
export function getRecommendedPlaylists() {
  return request({
    url: '/personalized',
    data: {
      limit: 6
    }
  })
}

/**
 * 获取榜单
 * @param {*} start 第一个榜单的位置
 * @param {*} end 最后一个榜单的位置
 * @param {*} itemLimit 每一个榜单的歌曲数
 */
export async function getTheList(start = 0, end = 1, itemLimit = 30) {
  let {
    list
  } = await request({
    url: '/toplist',
  })
  // 取前n个榜单
  list = list.slice(start, end)
  // 根据id 获取榜单详细数据
  const retList = []
  for (const item of list) {
    const {
      playlist
    } = await request({
      url: '/playlist/detail',
      data: {
        id: item.id
      }
    })
    retList.push({
      id: playlist.id,
      name: playlist.name,
      tracks: playlist.tracks.slice(0, itemLimit) //取前n个
    })
  }
  return retList;
}
import request from '@/utils/request'

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
 */
export async function getTheList() {
  let {
    list
  } = await request({
    url: '/toplist',
  })
  // 取前6个榜单
  list = list.slice(0, 6)
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
      tracks: playlist.tracks.slice(0, 10) //取前10个
    })


  }
  return retList;
}
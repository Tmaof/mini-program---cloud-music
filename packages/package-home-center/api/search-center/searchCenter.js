import {
  request
} from '@/utils/request'

/**
 * 获取热搜列表(详细)
 */
export function getHotSearchList() {
  return request({
    url: '/search/hot/detail'
  })
}
/**
 * 获取搜索建议
 * @param {*} keywords 
 */
export function getSearchSuggestion(keywords) {
  return request({
    url: '/search/suggest',
    data: {
      keywords,
      type: 'mobile'
    }
  })
}

/**
 * 获取搜索结果
 * @param {*} keywords 
 * @param {*} type 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
 */
export function getSearchResult(keywords, type) {
  return request({
    url: '/search',
    data: {
      keywords,
      type
    }
  })
}
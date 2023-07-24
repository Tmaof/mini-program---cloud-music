import {
  request
} from '@/utils/request'

/**
 * 获取资源的评论;
type: 数字, 资源类型, 对应歌曲, mv, 专辑, 歌单, 电台, 视频对应以下类型
 0: 歌曲
 1: mv
 2: 歌单
 3: 专辑
 4: 电台节目
 5: 视频
 6: 动态
 7: 电台
 * @param {*} id 
 * @param {*} type 
 * @param {*} pageNo 
 * @param {*} pageSize 
 * @param {*} sortType 
 * @param {*} cursor 
 */
export function getResourceComment(id, type, pageNo, pageSize, sortType, cursor) {
  return request({
    url: '/comment/new',
    data: {
      id,
      type,
      pageNo,
      pageSize,
      sortType,
      cursor
    }
  })
}

/**
 * 获取楼层评论
 * @param {*} parentCommentId 父评论ID 
 * @param {*} id 资源ID
 * @param {*} type 
 * @param {*} limit 
 * @param {*} time 分页参数,取上一页最后一项的 time 获取下一页数据
 */
export function getFloorComment(parentCommentId, id, type, limit, time) {
  return request({
    url: '/comment/floor',
    method: 'POST',
    data: {
      parentCommentId,
      id,
      type,
      limit,
      time
    }
  })
}

/**
 * 给评论点赞
 * @param {*} id 资源ID
 * @param {*} cid 评论ID
 * @param {*} t 是否点赞 , 1 为点赞 ,0 为取消点赞
 * @param {*} type 资源类型
 */
export function likeComment(id, cid, t, type) {
  return request({
    url: '/comment/like',
    method: 'POST',
    data: {
      id,
      cid,
      t,
      type,
    }
  })
}

/**
 * 发送或者删除评论
 * @param {*} t 1 发送, 2 回复, 0 删除
 * @param {*} id 资源id
 * @param {*} type 对应资源 类型
 * @param {*} content 要发送的内容
 * @param {*} commentId 回复的评论 id (回复评论时必填)
 */
export function sendOrDeleteComment(t,
  id,
  type,
  content,
  commentId) {
  return request({
    url: '/comment',
    method: 'POST',
    data: {
      t,
      id,
      type,
      content,
      commentId
    }
  })
}
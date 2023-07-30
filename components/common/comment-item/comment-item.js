import {
  getFloorComment,
  likeComment,
  sendOrDeleteComment
} from '@/api/common/comment/comment'
import {
  injectCheckLogin
} from '@/behaviors/injectCheckLogin'
import {
  fromNow
} from '@/utils/filter-js/filter'

Component({
  behaviors: [injectCheckLogin],
  options: {
    styleIsolation: 'shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    comment: {
      type: Object,
      value: null
    },
    resourceType: {
      type: Number,
      value: -1,
    },
    resourceId: {
      type: [String, Number],
      value: -1,
    },
    needFloorComment: {
      type: Boolean,
      value: true
    },
    beRepliedCommentId: {
      type: [String, Number],
      value: -1,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    limit: 20,
    foolrCommentList: [],
    foolrCommentListShengXu: [],
    showFloorComment: false,
    floorCommentShengxu: false, //楼层评论升序排序
    isLoading: false,
    hasMore: true,
    autosize: {
      maxHeight: 120,
      minHeight: 20,
    },
    isShowTextarea: false,
    textareaText: '',
    updateFloorCommentEventName: 'updateFloorComment',
    totalCount: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 获取楼层评论数据
     */
    async _getFloorComment() {
      this.setData({
        isLoading: true
      })
      let {
        foolrCommentList,
        resourceId,
        comment,
        resourceType,
        limit,
        floorCommentShengxu,
      } = this.data
      // 获取该页最后的评论时间
      let time = undefined
      if (foolrCommentList.length)
        time = foolrCommentList[foolrCommentList.length - 1].time
      const {
        data
      } = await getFloorComment(comment.commentId, resourceId, resourceType, limit, time)

      foolrCommentList = [...foolrCommentList, ...data.comments]
      const foolrCommentListShengXu = JSON.parse(JSON.stringify(foolrCommentList)).sort((a, b) => {
        return b.time - a.time
      })

      this.setData({
        foolrCommentList: floorCommentShengxu ? foolrCommentListShengXu : foolrCommentList,
        foolrCommentListShengXu,
        isLoading: false,
        hasMore: data.hasMore,
        totalCount: data.totalCount
      })
    },
    /**
     * 显示楼层评论
     * @param {*} e 
     */
    async onShowFloorComment() {
      if (this.data.foolrCommentList.length) {
        this.setData({
          showFloorComment: true
        })
      } else {
        this.setData({
          hasMore: true,
          isLoading: false,
          showFloorComment: true
        })
        this._getFloorComment()
      }

    },
    /**
     * 楼层评论排序
     */
    onSortFloorComment(e) {
      const floorCommentShengxu = e.currentTarget.dataset.shengxu
      this.setData({
        floorCommentShengxu
      })
    },
    onVisibleChange() {
      this.setData({
        showFloorComment: false,
        isShowTextarea: false
      })
    },
    /**
     * 加载更多楼层评论
     */
    onLoadMore() {
      if (this.data.isLoading || !this.data.hasMore) return
      this._getFloorComment()
    },
    /**
     * 点赞评论
     */
    async onLikeComment(e) {
      //登录判断
      if (!this.checkLogin()) return
      const like = e.currentTarget.dataset.like
      const {
        resourceId,
        comment,
        resourceType
      } = this.data
      const likedCount = this.data.comment.likedCount
      this.setData({
        'comment.liked': like,
        'comment.likedCount': like ? likedCount + 1 : likedCount - 1
      })
      likeComment(resourceId, comment.commentId, like ? 1 : 0, resourceType)
    },
    /**
     * 显示回复文本框
     */
    onShowTextarea(e) {
      this.setData({
        isShowTextarea: true,
      })
    },
    onTextAreaChange(e) {
      this.setData({
        textareaText: e.detail.value.trim()
      })
    },
    /**
     * 回复评论
     * @param {*} e 
     */
    async onReplyComment(e) {
      // 检查登陆
      if (!this.checkLogin()) return
      const {
        textareaText,
        resourceId,
        resourceType,
        comment,
        updateFloorCommentEventName
      } = this.data
      if (!textareaText) return
      const {
        code,
        comment: resComment
      } = await sendOrDeleteComment(2, resourceId, resourceType, textareaText, comment.commentId)
      wx.showToast({
        title: code == 200 ? '发表成功' : '发布失败',
        icon: 'none'
      })
      this.setData({
        isShowTextarea: false,
        textareaText: ''
      })
      if (code == 200) {
        // 更新回复数
        if (comment.showFloorComment) {
          this.setData({
            'comment.showFloorComment.showReplyCount': true,
            'comment.showFloorComment.replyCount': comment.showFloorComment.replyCount + 1,
          })
        }
        // 发送信号给父评论组件,更新楼层评论
        const newComment = {}
        newComment.commentId = resComment.commentId
        newComment.content = resComment.content
        newComment.time = resComment.time
        newComment.timeStr = fromNow(resComment.time)
        newComment.liked = false
        newComment.likedCount = 0
        newComment.user = resComment.user
        newComment.beReplied = [{
          user: resComment.beRepliedUser,
          content: comment.content
        }]
        this.triggerEvent(updateFloorCommentEventName, newComment)
      }
    },
    /**
     * 在楼层评论中回复后,更新楼层评论
     * @param {*} e 
     */
    onUpdateFloorComment(e) {
      //可以滚动加载更多
      if (this.data.hasMore) return
      //手动更新
      const newComment = e.detail
      const {
        foolrCommentList,
        foolrCommentListShengXu
      } = this.data
      this.setData({
        foolrCommentList: [...foolrCommentList, newComment],
        foolrCommentListShengXu: [newComment, ...foolrCommentListShengXu]
      })
    }
  }
})
import {
  getResourceComment,
  sendOrDeleteComment
} from '@/api/common/comment/comment'
import {
  injectCheckLogin
} from '@/behaviors/injectCheckLogin'

Component({
  behaviors: [injectCheckLogin],
  options: {
    styleIsolation: 'shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: Number,
      value: -1
    },
    resourceId: {
      optionalTypes: [Number, String],
      value: 0
    },
    visible: {
      type: Boolean,
      value: false
    },
    // 单位vh
    scrollViewHeight: {
      type: Number,
      value: ''
    },
    // 点击遮罩层可关闭
    closeOnOverlayClick: {
      type: Boolean,
      value: true
    },
    // 获取评论前清除评论列表
    resetBeforeFetch: {
      type: Boolean,
      value: false
    },
    // 评论列表有数据,再次显示时不再请求获取新数据
    existDataNotObtain: {
      type: Boolean,
      value: true
    },
    eagerLoad: {
      type: Boolean,
      value: false,
    }, //是否在组件挂载时立即加载评论

  },

  /**
   * 组件的初始数据
   */
  data: {
    commentList: [],
    pageNo: 1,
    pageSize: 20,
    sortType: 1,
    autosize: {
      maxHeight: 120,
      minHeight: 20,
    },
    textareaText: '',
    isLoading: false,
    hasMore: true,
    totalCount: 0,
    turnOffDisplayEventName: 'turnOffDisplay',
    commentCountChangeEventName: 'commentCountChange'
  },
  observers: {
    'visible': function (visible) {
      const {
        existDataNotObtain,
        commentList,
        resetBeforeFetch
      } = this.data
      //当显示的时候再获取评论
      if (!visible) return
      if ((!existDataNotObtain) || (existDataNotObtain && !commentList.length)) {
        if (resetBeforeFetch) {
          this._resetComment()
          this._getCommentList()
        } else {
          this._getCommentList()
        }
      }
    },
    'totalCount': function (totalCount) {
      this.triggerEvent(this.data.commentCountChangeEventName, totalCount)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onVisibleChange() {
      this.setData({
        visible: false
      })
      this.triggerEvent(this.data.turnOffDisplayEventName)
    },
    /**
     * 获取评论列表
     */
    async _getCommentList() {
      const {
        resourceId,
        type,
        pageNo,
        pageSize,
        sortType,
        commentList
      } = this.data
      if (!resourceId) return
      this.setData({
        isLoading: true
      })
      let cursor = undefined
      if (sortType == 3 && commentList.length) {
        cursor = commentList[commentList.length - 1].time
      }
      const {
        data
      } = await getResourceComment(resourceId, type, pageNo, pageSize, sortType, cursor)

      this.setData({
        commentList: [...commentList, ...data.comments],
        pageNo: pageNo + 1,
        isLoading: false,
        hasMore: data.hasMore,
        totalCount: data.totalCount
      })
    },
    onTextAreaChange(e) {
      this.setData({
        textareaText: e.detail.value.trim()
      })
    },
    /**
     * 发送评论
     */
    async onSendComment() {
      if (!this.checkLogin()) return
      const {
        textareaText,
        resourceId,
        type
      } = this.data
      if (!textareaText) return
      const {
        code
      } = await sendOrDeleteComment(1, resourceId, type, textareaText)
      wx.showToast({
        title: code == 200 ? '发表成功' : '发布失败',
        icon: 'none'
      })
      if (code == 200) {
        this.setData({
          textareaText: ''
        })
      }
    },
    /**
     * 重置评论数据
     */
    _resetComment() {
      this.setData({
        commentList: [],
        pageNo: 1,
      })
    },
    /**
     * 改变排序类型
     * @param {*} e 
     */
    onChangeSortType(e) {
      const type = e.target.dataset.type
      if (!type) return
      this.setData({
        sortType: type
      })
      this._resetComment()
      this._getCommentList()
    },
    /**
     * 滚动加载更多
     */
    onLoadMore() {
      if (this.data.isLoading || !this.data.hasMore) return
      this._getCommentList()
    },
    /**
     * 清空原评论,并获取新评论
     */
    _resetAndGetComment() {
      if (this.data.isLoading) return
      this._resetComment()
      this._getCommentList()
    }
  },

  lifetimes: {
    ready() {
      if (this.data.eagerLoad) {
        this._getCommentList()
      }
    }
  }
})
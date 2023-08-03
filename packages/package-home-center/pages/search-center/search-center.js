import {
  getHotSearchList,
  getSearchSuggestion
} from '@/packages/package-home-center/api/search-center/searchCenter'

import {
  getItem,
  setItem
} from '@/utils/localStorage'

import config from '@/config/config'

Page({
  options: {
    styleIsolation: 'shared'
  },
  /**
   * 页面的初始数据
   */
  data: {
    searchText: {
      text: '',
      keyword: ''
    },
    hotSearchList: [], //热门搜索列表
    searchKeyword: '', //搜索关键字
    searchSuggestion: [], //搜索建议
    isShowSearchSuggestion: false, //是否显示搜索建议
    isShowSearchResult: false, //是否显示搜索结果
    activeCollapseValues: [],
    historyList: [], //搜索列表
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.text && options.keyword) {
      this.setData({
        searchText: options
      })
    }

    this._getHotSearchList()
    // 获取搜索历史
    this.setData({
      historyList: getItem(config.searchHistoryKey) || []
    })
  },
  /**
   * 获取热搜列表(详细)
   */
  async _getHotSearchList() {
    const {
      data
    } = await getHotSearchList()
    this.setData({
      hotSearchList: data
    })
  },
  /**
   * 点击了搜索榜单的搜索关键字
   * 点击了搜索建议的搜索关键字
   * 点击了搜索历史的搜索关键字
   */
  onKeywordChange(e) {
    let keyword = ''
    if (e.currentTarget.dataset.keyword) {
      keyword = e.currentTarget.dataset.keyword
    } else {
      keyword = e.detail
    }
    keyword = keyword.trim()
    if (!keyword) return
    this.setData({
      searchKeyword: keyword
    })
    this.onClickSearchBtn()
  },
  /**
   * 获取搜索建议
   */
  async _getSearchSuggestion(keyword) {
    const {
      result
    } = await getSearchSuggestion(keyword)
    this.setData({
      searchSuggestion: result.allMatch.map(item => {
        return {
          keyword: item.keyword,
          list: item.keyword.split('')
        }
      })
    })
  },
  /**
   * 输入框输入改变
   * 
   */
  async onInputChange(e) {
    let keyword = e.detail.value
    keyword = keyword.trim()
    this.setData({
      searchKeyword: keyword
    })
    if (!keyword) {
      this.setData({
        isShowSearchSuggestion: false
      })
      return
    }
    await this._getSearchSuggestion(keyword)
    this.setData({
      isShowSearchResult: false,
      isShowSearchSuggestion: true
    })
  },
  /**
   * 点击搜索按钮
   */
  onClickSearchBtn() {
    const {
      searchKeyword,
      isShowSearchResult
    } = this.data
    if (!searchKeyword || isShowSearchResult) return
    const component = this.selectComponent('.search-result')
    component._clearData()
    component._initDefaultComponentData()
    // 添加搜索历史
    this._addSearchHistory(searchKeyword)
    this.setData({
      isShowSearchResult: true
    })
  },
  /**
   * 点击清空按钮
   */
  onInputClear() {
    this.setData({
      searchKeyword: '',
      isShowSearchSuggestion: false,
      isShowSearchResult: false
    })
  },
  /**
   * 输入框聚焦
   */
  onInputFocus() {
    const {
      searchKeyword
    } = this.data
    if (!searchKeyword) return
    this.onInputChange({
      detail: {
        value: searchKeyword
      }
    })
  },
  handleCollapseChange(e) {
    this.setData({
      activeCollapseValues: e.detail.value,
    });
  },
  /**
   * 添加搜索历史
   * @param {*} keyword 
   */
  _addSearchHistory(keyword) {
    let {
      historyList
    } = this.data
    // 移动到头部
    if (historyList.includes(keyword)) {
      historyList.splice(historyList.indexOf(keyword), 1)
      historyList.unshift(keyword)
      this.setData({
        historyList
      })
      return
    }
    historyList.unshift(keyword)
    if (historyList.length > 10) {
      historyList = historyList.slice(0, 10)
    }
    this.setData({
      historyList
    })
  },
  /**
   * 清空搜索历史
   */
  onClearSearchHistory() {
    this.setData({
      historyList: []
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 保存搜索历史到本地存储
    setItem(config.searchHistoryKey, this.data.historyList)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
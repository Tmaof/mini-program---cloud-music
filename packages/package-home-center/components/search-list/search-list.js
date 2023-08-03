// packages/package-home-center/components/search-list/search-list.js
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    keywordChangeEventName: 'keywordChange'
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    onClickKeyword(e) {
      this.triggerEvent(this.data.keywordChangeEventName, e.currentTarget.dataset.keyword)
    }
  }
})
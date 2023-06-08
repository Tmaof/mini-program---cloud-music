// components/info-item-card/info-item-card.js
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    props: {
      type: Object,
      value: {
        w: '',
        h: '',
        cover: '',
        name: '',
        infoL: '',
        infoR: '',
        params: '',
        url: ''
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
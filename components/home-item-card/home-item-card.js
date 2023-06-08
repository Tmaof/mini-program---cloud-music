// components/home-item-card/home-item-card.js
Component({
  options: {
    styleIsolation: 'apply-shared',
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 标题
    title: {
      type: String,
      value: '默认内容'
    },
    // 标题样式
    titleStyle: {
      type: String,
      value: 'large' || 'small'
    },
    // 是否显示底部下划线
    showUnderline: {
      type: Boolean,
      value: true
    },
    // 弹出层的位置
    popupPlacement: {
      type: String,
      value: 'bottom' || 'top' || 'left' || 'right' || 'center'
    },
    // 弹出层的标题
    popuptitle: {
      type: String,
      value: '标题'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    popupVisible: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShowPopup() {
      this.setData({
        popupVisible: true
      })
    },
    onVisibleChange(e) {
      this.setData({
        popupVisible: false
      })
    }
  }
})
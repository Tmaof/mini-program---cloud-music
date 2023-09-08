function getMoveInfo() {
  return {
    up: false,
    down: false,
    left: false,
    right: false,
    distanceY: '', // 移动距离, 向下为正
    distanceX: '', //移动距离,向右为正
    elementInfo: null, //元素信息
  }
}

function getTouchInfo() {
  return {
    up: false,
    down: false,
    left: false,
    right: false,
    distanceY: '', // 移动距离, 向下为正
    distanceX: '', //移动距离,向右为正
    touchInfo: null, //手指触摸信息
    elementInfo: null, //元素信息
  }
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 阈值
    yThreshold: {
      type: Number,
      value: 20
    },
    xThreshold: {
      type: Number,
      value: 20
    },
    selector: {
      type: String,
      value: '.touch-panel-container'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    startTouchObj: {
      clientX: 0,
      clientY: 0
    },
    startTouchEventName: 'start-touch',
    moveEventName: 'move',
    touchEventName: 'touch',
    lastTouchObj: {
      clientX: 0,
      clientY: 0
    },

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getElementInfo() {
      return new Promise((resolve, reject) => {
        const query = this.createSelectorQuery()
        const element = query.select(this.data.selector)
        if (element) {
          element.boundingClientRect(function (res) {
            resolve(res)
            // console.log(res, 'res')
            /**
             bottom: 803.2000122070312
             dataset: {}
             height: 603.2000122070312
             id: ""
             left: 0
             right: 375.20001220703125
             top: 200 // 这个组件内 .touch-panel-container 节点的上边界坐标
             width: 375.20001220703125
             */
          }).exec()
        } else {
          reject(Error('获取触摸区域元素失败'))
        }
      })
    },
    onTouchStart(e) {
      // console.log('start', e.touches[0])
      this.setData({
        startTouchObj: e.touches[0],
        lastTouchObj: e.touches[0]
      })
      this.triggerEvent(this.data.startTouchEventName, e.touches[0])
    },
    async onTouchMove(e) {
      // console.log('move', e.touches[0])
      this.setData({
        lastTouchObj: e.touches[0]
      })
      const {
        clientX: startClientX,
        clientY: startClientY
      } = this.data.startTouchObj
      const {
        clientX,
        clientY
      } = e.touches[0]
      const elementInfo = await this.getElementInfo()
      const moveInfo = getMoveInfo()
      moveInfo.elementInfo = elementInfo
      // 上下
      const Y = clientY - startClientY
      moveInfo.distanceY = Y
      // 向下
      if (Y > this.data.yThreshold) {
        moveInfo.down = true
      } else if (Y < -this.data.yThreshold) {
        moveInfo.up = true
      }

      // 左右
      const X = clientX - startClientX
      moveInfo.distanceX = X
      // 向右
      if (X > this.data.xThreshold) {
        moveInfo.right = true
      } else if (X < -this.data.xThreshold) {
        moveInfo.left = true
      }
      this.triggerEvent(this.data.moveEventName, moveInfo)
    },
    async onTouchEnd(e) {
      // console.log(e, 'end')
      const {
        clientX: startClientX,
        clientY: startClientY
      } = this.data.startTouchObj
      const touch = this.data.lastTouchObj
      const {
        clientX,
        clientY
      } = touch

      const elementInfo = await this.getElementInfo()
      const touchInfo = getTouchInfo()
      touchInfo.elementInfo = elementInfo
      touchInfo.touchInfo = touch
      // 上下
      const Y = clientY - startClientY
      touchInfo.distanceY = Y
      // 向下
      if (Y > this.data.yThreshold) {
        touchInfo.down = true
      } else if (Y < -this.data.yThreshold) {
        touchInfo.up = true
      }

      // 左右
      const X = clientX - startClientX
      touchInfo.distanceX = X
      // 向右
      if (X > this.data.xThreshold) {
        touchInfo.right = true
      } else if (X < -this.data.xThreshold) {
        touchInfo.left = true
      }
      this.triggerEvent(this.data.touchEventName, touchInfo)
    }
  }
})
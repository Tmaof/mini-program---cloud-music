export const injectSystemInfo = Behavior({
  data: {
    systemInfo: null
  },
  lifetimes: {
    attached() {
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            systemInfo: res
          })
        },
        fail: () => {
          wx.showToast({
            title: '获取系统信息失败',
            icon: 'none'
          })
        }
      })
    }
  }
})
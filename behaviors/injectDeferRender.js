export const injectDeferRender = Behavior({
  lifetimes: {
    attached() {
      /** 组件注册后，当前定时器id */
      this.deferRenderTid = 0;
      this.deferRenderCurrentLen = 0;
      /** 每次渲染多少个元素 */
      this.deferRenderStep = 30;
      /** 不断向 deferRenderList 中添加元素 */
      this.data.deferRenderList = []

      const updateDeferRnderList = () => {
        /** 需要分片加载的数据，名称为 needDeferRenderList  */
        const list = this.data.needDeferRenderList || []
        if (list.length === 0) return
        const nextIndex = this.deferRenderCurrentLen + this.deferRenderStep
        const newList = list.slice(0, Math.min(nextIndex, list.length))
        this.setData({
          deferRenderList: newList
        })
        this.deferRenderCurrentLen = nextIndex
        // 打印测试，数组元素是否是不断添加的
        // console.log(newList.length)
        if (newList.length === list.length && list.length !== 0) {
          return clearInterval(this.deferRenderTid)
        }
      }

      // 可以先立即执行一次
      updateDeferRnderList();
      this.deferRenderTid = setInterval(() => {
        updateDeferRnderList();
      }, 500);
    },
    detached() {
      clearInterval(this.deferRenderTid)
    }
  }
})
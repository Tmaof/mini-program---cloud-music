import {
  getCommendVideoList
}from '@/api/video-center/commend-video/commendVideo'


Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    commendVideoList:[]
  },
  lifetimes: {
    attached() {
      this._addCommendVideo()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 添加推荐视频
     */
   async _addCommendVideo() {
      const res = await getCommendVideoList()
      console.log(res)
    }
  }
})
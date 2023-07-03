import {
  injectMusicPlayerStore
} from '@/behaviors/injectMusicPlayerStore'

Component({
  behaviors: [injectMusicPlayerStore],
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
    isShowSongList: false, //是否显示歌曲列表
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 显示歌曲列表
    onShowSongList() {
      this.setData({
        isShowSongList: true
      })
    }
  }
})
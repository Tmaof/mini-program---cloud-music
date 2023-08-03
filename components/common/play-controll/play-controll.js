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
    isShowMusicPlayer: false,
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
    },
    onShowMusicPlayer() {
      if (!this.data.songInfo) {
        wx.showToast({
          title: '当前没有播放的歌曲!',
          icon: 'none'
        })
        return
      }
      this.setData({
        isShowMusicPlayer: true
      })
    },
    _showMusicPlayer() {
      this.setData({
        isShowMusicPlayer: true
      })
    }
  }
})
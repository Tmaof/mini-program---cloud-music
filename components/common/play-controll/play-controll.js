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
    firstShowSongList: false, //刚开始时不加载播放列表组件,提高加载速度
    isShowSongList: false, //是否显示歌曲列表
    firstShowMusicPlayer: false, //刚开始时不加载音乐播放器组件,提高加载速度
    isShowMusicPlayer: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 显示歌曲列表
    onShowSongList() {
      this.setData({
        firstShowSongList: true,
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
        firstShowMusicPlayer: true,
        isShowMusicPlayer: true
      })
    },
    _showMusicPlayer() {
      this.setData({
        firstShowMusicPlayer: true,
        isShowMusicPlayer: true
      })
    }
  }
})
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
    songList: {
      type: Array,
      value: []
    },
    isShowCover: {
      type: Boolean,
      value: true
    }, //是否显示封面
    isShowIndex: {
      type: Boolean,
      value: false
    }, //是否显示索引
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
    onPlayMusic(e) {
      // 切换歌单
      this.changeSongList(null, this.data.songList)
      // 显示音乐播放器
      this.selectComponent('#play-controll').onShowMusicPlayer()
      // 播放音乐
      this.playTheSong(e.currentTarget.dataset.songid)
    }
  },

  // 生命周期
  lifetimes: {

  }
})
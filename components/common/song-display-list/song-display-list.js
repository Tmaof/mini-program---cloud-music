import {
  injectMusicPlayerStore
} from '@/behaviors/injectMusicPlayerStore'
import {
  injectDeferRender
} from '@/behaviors/injectDeferRender'

Component({
  behaviors: [injectMusicPlayerStore, injectDeferRender],
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
    /** 需要分片加载的歌曲列表 */
    needDeferRenderList: {
      type: Array,
      value: []
    },
    //是否显示封面
    isShowCover: {
      type: Boolean,
      value: true
    },
    //是否显示索引
    isShowIndex: {
      type: Boolean,
      value: false
    },
    songListHeigth: {
      type: String,
      value: ''
    }, //歌曲列表scroll-view高度
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
    async onPlayMusic(e) {
      // 切换歌单
      await this.changeSongList(null, this.data.songList)
      // 播放音乐,先更新当前播放歌曲信息再显示播放器
      this.playTheSong(e.currentTarget.dataset.songid)
      // 显示音乐播放器
      this.selectComponent('#play-controll')._showMusicPlayer()
    }
  },

  // 生命周期
  lifetimes: {

  }
})
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
    title: {
      type: String,
      value: '默认内容'
    },
    describe: {
      type: String,
      value: '描述'
    },
    list: {
      type: Array,
      value: []
    },
    // 歌单ID
    playlistId: {
      type: Number,
      value: 0,
    }
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
      if (!this.data.list) return
      // 切换歌单
      await this.changeSongList(null, this.data.list)
      //播放音乐
      // console.log(e)
      this.playTheSong(e.currentTarget.dataset.songid)
    }
  }
})
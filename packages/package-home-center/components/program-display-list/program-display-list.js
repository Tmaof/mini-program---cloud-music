import {
  injectMusicPlayerStore
} from '@/behaviors/injectMusicPlayerStore'
import {
  getDjProgram
} from '@/packages/package-home-center/api/broadcaster-display/broadcasterDisplay'
Component({
  behaviors: [injectMusicPlayerStore],
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    djId: {
      type: String,
      value: ''
    },
    programCount: {
      type: Number,
      value: 0
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
    programsList: [], //节目列表
    limit: 30,
    offset: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 播放节目
     * @param {*} e 
     */
    onPlayMusic(e) {
      // 切换歌单
      this.changeSongList(null, this.data.programsList)
      // 播放音乐,先更新当前播放歌曲信息再显示播放器
      this.playTheSong(e.currentTarget.dataset.songid)
      // 显示音乐播放器
      this.selectComponent('#play-controll').onShowMusicPlayer()
    },
    /**
     * 获取节目列表
     */
    async _getProgramsList() {
      if (this.data.offset > this.data.programCount) {
        wx.showToast({
          title: '没有更多了哟',
          icon: 'none'
        })
        return
      }
      const {
        programs
      } = await getDjProgram(this.data.djId, this.data.limit, this.data.offset)

      const programsList = programs.map(item => {
        item.mainSong.createTime = item.createTime
        item.mainSong.listenerCount = item.listenerCount
        item.mainSong.duration = item.duration
        item.mainSong.coverUrl = item.coverUrl
        return item.mainSong
      })

      this.setData({
        programsList: [...this.data.programsList, ...programsList],
        offset: this.data.offset + this.data.limit
      })
    }
  },

  // 生命周期
  lifetimes: {
    // 可以正确获取到djId
    ready() {
      this._getProgramsList()
    }
  }
})
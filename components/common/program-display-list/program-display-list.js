import {
  injectMusicPlayerStore
} from '@/behaviors/injectMusicPlayerStore'
import {
  getDjProgram
} from '@/api/common/dj/dj'
Component({
  behaviors: [injectMusicPlayerStore],
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    propList: {
      type: Array,
      value: []
    }, //节目列表
    djId: {
      type: String,
      value: ''
    }, //电台id,可选值,如果传入则会根据电台ID获取电台节目
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
    isShowTime: {
      type: Boolean,
      value: true
    }, //是否显示创建时间
    programsListHeigth: {
      type: String,
      value: ''
    }, //节目列表scroll-view高度
    isShowAuthor: {
      type: Boolean,
      value: false,
    }, //是否显示作者
  },

  /**
   * 组件的初始数据
   */
  data: {
    limit: 30,
    offset: 0,
    programsList: [],
    isLoading: false
  },

  observers: {
    'propList': function (list) {
      if (list.length) {
        this.setData({
          programsList: [...this.data.programsList, ...this._getSongList(list)]
        })
      }
    }
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
      this.selectComponent('#play-controll')._showMusicPlayer()
    },
    /**
     * 获取节目列表
     */
    async _getProgramsList() {
      if (!this.data.djId) return
      if (this.data.offset > this.data.programCount) {
        wx.showToast({
          title: '没有更多了哟',
          icon: 'none'
        })
        return
      }
      this.setData({
        isLoading: true
      })
      const {
        programs
      } = await getDjProgram(this.data.djId, this.data.limit, this.data.offset)

      const songList = this._getSongList(programs)

      this.setData({
        programsList: [...this.data.programsList, ...songList],
        offset: this.data.offset + this.data.limit,
        isLoading: false
      })
    },
    _getSongList(programlist) {
      return programlist.map(item => {
        item.mainSong.createTime = item.createTime
        item.mainSong.listenerCount = item.listenerCount
        item.mainSong.duration = item.duration
        item.mainSong.coverUrl = item.coverUrl
        item.mainSong.programId = item.id
        item.mainSong.djId = item.radio.id
        return item.mainSong
      })
    },
    onScrolltolower() {
      if (this.data.isLoading) return
      this._getProgramsList()
    }
  },

  // 生命周期
  lifetimes: {
    attached() {},
    // 可以正确获取到djId
    ready() {
      this._getProgramsList()
    }
  }
})
import {
  injectMusicPlayerStore
} from '@/behaviors/injectMusicPlayerStore'


Component({
  options: {
    styleIsolation: 'shared'
  },
  behaviors: [injectMusicPlayerStore],
  /**
   * 组件的属性列表
   */
  properties: {
    popupVisible: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showWarnConfirm: false,
    swiperCurrent: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _hidePopup() {
      this.setData({
        popupVisible: false
      })
      const tid = setTimeout(() => {
        // 切换到当前播放页面
        this.setData({
          swiperCurrent: 0
        })
        clearTimeout(tid)
      }, 300)
    },
    onVisibleChange() {
      this._hidePopup()
    },
    // 切换播放模式
    onSwitchMode() {
      const {
        playbackMode,
        playbackModeValues
      } = this.data
      let mode = ''
      switch (playbackMode) {
        case playbackModeValues.Sequential: {
          mode = playbackModeValues.Random
          break
        }
        case playbackModeValues.Random: {
          mode = playbackModeValues.Loop
          break
        }
        case playbackModeValues.Loop: {
          mode = playbackModeValues.Sequential
          break
        }
      }
      this.switchPlaybackModes(mode)
    },
    // 播放音乐
    onPlayMusic(e) {
      this.playTheSong(e.currentTarget.dataset.songid)
    },
    // 从播放列表移除歌曲
    onDeleteSong(e) {
      this.deleteSong(e.currentTarget.dataset.songid)
    },
    // 清空列表
    onCleanSongList() {
      if (!this.data.songList.length) return
      this.setData({
        showWarnConfirm: true,
        popupVisible: false
      })
    },
    onConfirmCleanList() {
      this.cleanSongList()
      this.setData({
        showWarnConfirm: false
      })
    },
    closeDialog() {
      this.setData({
        showWarnConfirm: false
      })
    },
    // 播放上次的音乐
    async onPlayLastMusic(e) {
      // 隐藏播放列表
      this._hidePopup()
      //切换歌单
      await this.changeSongList(null, this.data.lastSongList)
      // 播放音乐
      this.playTheSong(e.currentTarget.dataset.songid)
    }

  }
})
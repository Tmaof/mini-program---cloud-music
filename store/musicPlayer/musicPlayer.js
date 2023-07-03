import {
  observable,
  action
} from 'mobx-miniprogram'
import {
  getSongListByPlaylistId
} from '@/api/home/playlist/playlist'


export const musicPlayerStore = observable({
  songList: [], // 歌曲列表\歌单的歌曲
  lastSongList: [], //上一次的歌单
  playbackModeValues: {
    Sequential: 'Sequential',
    Loop: 'Loop',
    Random: 'Random'
  },
  playbackMode: 'Sequential', //播放模式
  //是否正在播放音乐
  isPlaying: false,
  //当前歌曲信息
  songInfo: null,
  /**
   * 播放器实例
   * https: //developers.weixin.qq.com/miniprogram/dev/api/media/audio/InnerAudioContext.html
   */
  innerAudioContext: wx.createInnerAudioContext({
    useWebAudioImplement: false
  }),

  /**
   * 添加事件监听
   */
  addEventListener() {
    //监听音频自然播放至结束的事件
    this.innerAudioContext.onEnded(() => {
      if (!this.songList.length) return
      if (this.playbackMode == this.playbackModeValues.Loop) return
      this.switchSong('down')
    })

    // 监听音频可以播放事件
    this.innerAudioContext.onCanplay(() => {
      //更新当前播放歌曲信息
      this.updateSongInfo()
    })

    //监听播放事件
    this.innerAudioContext.onPlay(() => {
      //播放列表为空判断和处理
      if (!this.songList.length) {
        wx.showToast({
          title: '播放列表为空',
          icon: 'none'
        })
        this.cleanSongList()
        return
      }
      this.isPlaying = true
    })

    //监听暂停
    this.innerAudioContext.onPause(() => {
      this.isPlaying = false
    })

    //监听停止
    this.innerAudioContext.onStop(() => {
      this.isPlaying = false
    })

    //监听错误
    this.innerAudioContext.onError(() => {

    })
  },

  //当前歌曲在列表中的索引
  songIndex: action(function (list) {
    return (list || this.songList).findIndex(item => item.url == this.innerAudioContext.src)
  }),


  /**
   * 切换播放的歌单
   * @param {number} playlistId 通过歌单id获取
   * @param {number} list 直接给歌曲列表
   */
  changeSongList: action(async function (playlistId, list) {
    let songList = null
    if (playlistId) {
      const {
        songs
      } = await getSongListByPlaylistId(playlistId)
      songList = songs
    } else if (list) {
      if (this.songList == list) return
      songList = list
    }

    if (!songList) return
    songList.forEach(item => {
      item.url = `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`
    })
    this.lastSongList = this.songList
    this.songList = songList
  }),

  /**
   * 更新当前播放歌曲信息
   */
  updateSongInfo() {
    this.songInfo = this.songList[this.songIndex()]
  },

  /**
   * 播放歌曲
   */
  startPlay() {
    //更新当前播放歌曲信息
    this.updateSongInfo()
    //自动跳过vip歌曲
    if (this.songInfo.fee == 1) {
      wx.showToast({
        title: '当前为VIP歌曲，自动切换下一首',
        icon: 'none'
      })
      this.switchSong('down')
    }
    this.innerAudioContext.play()
  },

  /**
   * 播放歌曲
   * 继续播放
   * @param {} songId 歌曲id(未传入则继续播放暂停的音乐)
   */
  playTheSong: action(function (songId) {
    if (songId) {
      const item = this.songList.find(item => item.id == songId)
      // console.log(item,'item')
      if (item) {
        this.innerAudioContext.src = item.url
      } else {
        console.error('在播放列表中,未找到该歌曲')
      }
    } else if (!this.innerAudioContext.src) {
      this.innerAudioContext.src = this.songList[0].url
    }
    this.startPlay()
  }),

  /**
   * 暂停播放
   */
  pausePlay: action(function () {
    this.innerAudioContext.pause()
  }),

  /**
   * 停止播放
   */
  stopPlay: action(function () {
    this.innerAudioContext.stop()
  }),

  /**
   * 切换上一首/下一首
   * @param {'up' | 'down' } mode 'up' | 'down'
   * @param { boolean } forceSwitch 当为单曲循环时是否切换歌曲
   */
  switchSong: action(function (mode, forceSwitch) {
    // 顺序播放
    if (this.playbackMode == this.playbackModeValues.Sequential || forceSwitch) {
      let index = this.songIndex()
      if (mode == 'up') {
        if (index == 0) index = this.songList.length
        index--
      }
      if (mode == 'down') {
        if (index == this.songList.length - 1) index = -1
        index++
      }
      this.innerAudioContext.src = this.songList[index].url
    }
    // 随机播放
    if (this.playbackMode == this.playbackModeValues.Random) {
      const index = Math.round(Math.random() * (this.songList.length - 1))
      this.innerAudioContext.src = this.songList[index].url
    }

    this.startPlay()
  }),

  /**
   * 切换播放模式
   * @param {'Sequential' | 'Loop' | 'Random'} mode 
   */
  switchPlaybackModes: action(function (mode) {
    if (mode == this.playbackModeValues.Loop) {
      this.innerAudioContext.loop = true
    } else {
      this.innerAudioContext.loop = false
    }
    this.playbackMode = mode
  }),
  /**
   * 从播放列表中删除歌曲
   */
  deleteSong: action(function (songId) {
    if (this.songInfo.id == songId) {
      if (this.songList.length <= 1) {
        this.cleanSongList()
      } else {
        this.switchSong('down',true)
      }
    }
    setTimeout(() => {
      this.songList = this.songList.filter((item) => item.id != songId)
    }, 50)
  }),
  /**
   * 清空播放列表
   */
  cleanSongList: action(function () {
    this.songList = []
    this.songInfo = null
    this.stopPlay()
  })

})

musicPlayerStore.addEventListener()
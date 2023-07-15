import {
  observable,
  action
} from 'mobx-miniprogram'
import {
  getSongListByPlaylistId
} from '@/api/home/playlist/playlist'
import {
  getAuthorName
} from '@/utils/filter-js/filter'

import config from '@/config/config'

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
  currentTime: 0, //当前播放进度
  duration: 0, //总时长
  /**
   * 播放器实例
   * https: //developers.weixin.qq.com/miniprogram/dev/api/media/audio/InnerAudioContext.html
   * 背景播放器
   * https: //developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/BackgroundAudioManager.html
   */
  innerAudioContext: wx.getBackgroundAudioManager(),

  /**
   * 添加事件监听
   */
  addEventListener() {
    //监听音频自然播放至结束的事件
    this.innerAudioContext.onEnded(() => {
      // this.isPlaying = false
      if (this.playbackMode == this.playbackModeValues.Loop) return
      this.switchSong('down')
    })

    // 监听音频可以播放事件
    this.innerAudioContext.onCanplay(() => {
      this.duration = this.innerAudioContext.duration
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

    //监听播放进度
    this.innerAudioContext.onTimeUpdate(() => {
        this.currentTime = this.innerAudioContext.currentTime
        this.duration = this.innerAudioContext.duration
        // console.log(this.currentTime)
      }),

      // 监听用户在系统音乐播放面板点击下一曲事件（仅iOS）
      this.innerAudioContext.onNext(() => {
        this.switchSong('down')
      }),

      // 监听用户在系统音乐播放面板点击上一曲事件（仅iOS）
      this.innerAudioContext.onPrev(() => {
        this.switchSong('up')
      })

    //监听错误
    this.innerAudioContext.onError(() => {

    })
  },

  //当前歌曲在列表中的索引
  getSongIndex: action(function () {
    if (!this.songList.length) {
      throw ('当前歌单为空')
      return
    }
    if (!this.songInfo) this.songInfo = this.songList[0]
    return this.songList.findIndex(item => item.id == this.songInfo.id)
  }),

  /**
   *判断传入的歌单是否和当前歌单相同(包括先后顺序)
   *@param {[]} newList 
   */
  isSameSongList(newList) {
    if (!this.songList) return true
    if (this.songList.length != newList.length) return false
    for (let i = 0; i < newList.length; i++) {
      if (this.songList[i].id != newList[i].id) return false
    }
    return true
  },

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
      if (this.isSameSongList(list)) return //相同歌单不进行操作
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
   * @param {*} data 
   * @param {'songid'|'index'|'obj'} mode 传入的data的格式
   */
  updateSongInfo(data, mode) {
    let songInfo = null
    if (mode == 'index') {
      songInfo = this.songList[data]
    } else if (mode == 'obj') {
      songInfo = data
    } else if (mode == 'songid') {
      songInfo = this.songList.find(item => (item.id == data))
    }
    // console.log(songInfo)
    if (!songInfo) {
      console.error('更新当前播放歌曲信息失败')
      return false
    }
    this.songInfo = songInfo
    this.innerAudioContext.src = songInfo.url
    this.innerAudioContext.title = songInfo.name
    this.innerAudioContext.epname = (songInfo.al || songInfo.album).name
    this.innerAudioContext.singer = getAuthorName(songInfo.ar || songInfo.artists)
    this.innerAudioContext.coverImgUrl = songInfo.coverUrl || songInfo.al.picUrl || songInfo.album.picUrl
    this.innerAudioContext.webUrl = config.blogUrl
  },

  /**
   * 播放歌曲
   */
  startPlay() {
    if (!this.songInfo) return
    //自动跳过vip歌曲
    if (this.allSongIsVip()) {
      wx.showToast({
        title: '当前歌单的歌曲全为VIP歌曲，请切换歌单',
        icon: 'none'
      })
      this.stopPlay()
      return
    }
    if (this.songInfo.fee == 1) {
      wx.showToast({
        title: '当前为VIP歌曲，自动切换下一首',
        icon: 'none'
      })
      this.switchSong('down')
      return
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
      //更新当前播放歌曲信息
      this.updateSongInfo(songId, 'songid')
    } else if (!this.songInfo && this.songList.length) {
      this.updateSongInfo(0, 'index')
    }
    // 继续播放
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
   * @param { 'up' | 'down' } mode 'up' | 'down'
   * @param { boolean } forceSwitch 当为单曲循环时是否切换歌曲
   */
  switchSong: action(function (mode, forceSwitch = true) {
    if (!this.songList.length) return
    // console.log(mode)
    // 当直接传入event对象时
    if (mode.currentTarget) {
      mode = mode.currentTarget.dataset.mode
    }
    let index = undefined
    // 顺序播放
    if (this.playbackMode == this.playbackModeValues.Sequential || forceSwitch) {
      index = this.getSongIndex()
      if (mode == 'up') {
        if (index == 0) index = this.songList.length
        index--
      }
      if (mode == 'down') {
        if (index == this.songList.length - 1) index = -1
        index++
      }
    }
    // 随机播放
    else if (this.playbackMode == this.playbackModeValues.Random) {
      index = Math.round(Math.random() * (this.songList.length - 1))
    }
    if (index === undefined || index < 0) {
      console.error('切换歌曲错误')
      return
    }
    //更新当前播放歌曲信息
    this.updateSongInfo(index, 'index')
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
        this.switchSong('down', true)
      }
    }
    this.songList = this.songList.filter((item) => item.id != songId)
  }),
  /**
   * 清空播放列表
   */
  cleanSongList: action(function () {
      this.songList = []
      this.songInfo = null
      this.stopPlay()
    })

    ,
  /**
   * 改变播放进度
   */
  changeProgress: action(function (value) {
    this.innerAudioContext.seek(value)
  }),

  /**
   * 判断歌曲列表是否全部是vip歌曲
   * 
   */
  allSongIsVip() {
    return this.songList.find(item => item.fee != 1) ? false : true
  }
})

musicPlayerStore.addEventListener()
import {
  getPlaylistByCategoryTags
} from '@/packages/package-home-center/api/playlist-center/playlistCenter'
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 分类标签名
    tagName: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playlists: [],
    limit: 15,
    offset: 0,
    isRequestingFlag: false, //是否正在请求数据
  },
  lifetimes: {
    attached() {
      this._getPlaylist()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 获取歌单
     */
    async _getPlaylist() {
      if (!this.data.tagName || this.data.isRequestingFlag) return
      this.setData({
        isRequestingFlag: true
      })
      const {
        playlists
      } = await getPlaylistByCategoryTags(this.data.tagName, this.data.limit, this.data.offset)
      this.setData({
        isRequestingFlag: false,
        playlists: [...this.data.playlists, ...playlists || []],
        offset: this.data.offset + this.data.limit + 1
      })

    },
    /**
     * 上拉加载更多
     */
    onCrolltolower() {
      this._getPlaylist()
    },
    /**
     * 重设数据
     * @param {*} tagName 
     */
    _resetData(tagName) {
      this.setData({
        tagName,
        playlists: [],
        offset: 0,
        isRequestingFlag: false
      })
      this._getPlaylist()
    }
  }
})
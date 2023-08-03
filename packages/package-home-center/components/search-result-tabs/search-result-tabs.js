Component({
  /**
   * 组件的属性列表
   */
  properties: {
    keyword: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabValue: 'component-song', //tabs选中项
    componentId: {
      song: 'component-song',
      playlist: 'component-playlist',
      video: 'component-video',
      dj: 'component-dj',
      voice: 'component-voice'
    },
    loadedComponentIdList: [],
    songList: [], //单曲列表
    playlistList: [], //歌单列表
    videoList: [], //视频列表
    mvList: {}, //mv列表
    djList: [], //电台列表
    voiceList: [], //声音列表
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 激活的选项卡发生变化时触发
     * 选择相应组件加载数据
     * @param {*} e 
     */
    async onTabChange(e) {
      const id = e.detail.value
      this.setData({
        tabValue: id
      })
      const {
        loadedComponentIdList
      } = this.data

      if (loadedComponentIdList.includes(id)) return
      const component = this.selectComponent('#' + id)
      if (!component) return
      // 再次点击时,不会加载已经加载过的数据
      this.setData({
        loadedComponentIdList: [...loadedComponentIdList, id]
      })
      component._getData()
    },
    /**
     * 清空组件数据
     */
    _clearData() {
      this.data.loadedComponentIdList.forEach(id => {
        this.selectComponent('#' + id)._clearData()
      })
      this.setData({
        loadedComponentIdList: []
      })
    },
    /**
     * 获取默认组件数据(单曲数据)
     */
    _initDefaultComponentData() {
      this.onTabChange({
        detail: {
          value: this.data.tabValue
        }
      })
    }
  }
})
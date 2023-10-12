export default {
  baseUrl: 'http://127.0.0.1:3000',
  cookieKey: 'cookie', //cookie保存本地的key名称
  blogUrl: 'https://www.yuque.com/maofu-rzqcp',
  searchHistoryKey: 'searchHistory',
  //在获取歌曲url的时候是否通过发送请求获取
  //如果为true: 表示发送网络请求携带歌曲id去获取歌曲url,这将会有更多的时间消耗
  //如果为false:歌曲url = `https://music.163.com/song/media/outer/url?id=${歌曲id}.mp3`
  //建议设置为false,如果不能正常播放歌曲时再设置为ture
  isGetSongUrlByRequest: true
}
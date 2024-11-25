import config from "@/config/config";
import {
  getSongUrl
} from "@/api/common/common";
import {
  requestForResources
} from "@/utils/util";

/**
 * 为歌曲列表中的歌曲信息添加播放的url
 * @param {[]} songList
 */
export const setSongUrl = (songList) => {
  return new Promise(async (resolve, reject) => {
    // 如果已经有url了就不用添加了
    if (songList.length && songList[0].url) return resolve(songList);
    // 如果 配置中不需要根据歌曲id请求url，那么就直接拼接资源地址
    if (!config.isGetSongUrlByRequest) {
      songList.forEach((item) => {
        item.url = `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`;
      });
      return resolve(songList);
    }
    // 需要根据歌曲id请求歌曲url
    const map = new Map();
    songList.forEach((song) => {
      map.set(song.id, song);
    });
    const idList = songList.map((item) => item.id);
    /** 每次请求50个歌曲的url，避免一次请求太多导致getSongUrl超时 */
    const step = 50;
    const argList = []
    for (let i = 0; i < idList.length; i += step) {
      const ids = idList.slice(i, Math.min(i + step, idList.length)).join(",");
      argList.push(ids);
    }
    // 添加，执行 请求歌曲url的任务，并发执行
    const resList = await requestForResources(argList, getSongUrl).catch(reject)
    resList.forEach(({
      data
    }) => {
      data.forEach((info) => {
        const song = map.get(info.id)
        if (!song) return
        song.url = info.url // 添加url
      })
    })
    return resolve(Array.from(map.values()))
  });
};
import {
  musicPlayerStore
} from '@/store/musicPlayer/musicPlayer'

import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'

export const injectMusicPlayerStore = Behavior({
  lifetimes: {
    attached() {
      this.storeBindings = createStoreBindings(this, {
        store: musicPlayerStore,
        fields: ['songList', 'lastSongList', "playbackModeValues", 'playbackMode', 'innerAudioContext', 'isPlaying', 'songInfo', 'currentTime', 'duration'],
        actions: ['changeSongList', 'playTheSong', 'pausePlay', 'switchSong', 'switchPlaybackModes', 'deleteSong', 'cleanSongList', 'changeProgress']
      })
    },
    detached() {
      this.storeBindings.destroyStoreBindings()
    }
  }
})
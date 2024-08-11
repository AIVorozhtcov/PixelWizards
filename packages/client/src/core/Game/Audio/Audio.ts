import { BATTLE_SONG, GAME_OVER_SONG } from '../../../constants/audioConstants';

export default class AudioPlayer {
  situationSong: HTMLAudioElement | null;
  backgroundSong: HTMLAudioElement | null;

  constructor() {
    this.situationSong = null;
    this.backgroundSong = null;
  }

  playBackgroundSong() {
    this.backgroundSong = new Audio(BATTLE_SONG);
    this.backgroundSong.volume = 0.05;
    this.backgroundSong.loop = true;
    this.backgroundSong.play();
  }

  stopBackgroundSong() {
    if (this.backgroundSong) {
      this.backgroundSong.pause();
    }
  }

  playEndGameSong() {
    this.situationSong = new Audio(GAME_OVER_SONG);
    this.situationSong.volume = 0.1;
    this.situationSong.play();
  }

  stopEndGameSong() {
    if (this.situationSong) {
      this.situationSong.pause();
    }
  }

  stopAll() {
    this.backgroundSong?.pause();
    this.situationSong?.pause();
  }
}

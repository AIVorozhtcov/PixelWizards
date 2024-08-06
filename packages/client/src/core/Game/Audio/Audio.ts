export default class AudioPlayer {
  situationSong: HTMLAudioElement | null;
  backgroundSong: HTMLAudioElement | null;

  constructor() {
    this.situationSong = null;
    this.backgroundSong = null;
  }

  playBackgroundSong() {
    this.backgroundSong = new Audio('/sound/battleSong.mp3');
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
    this.situationSong = new Audio('/sound/endGameSong.mp3');
    this.situationSong.volume = 0.1;
    this.situationSong.play();
  }

  stopEndGameSong() {
    if (this.situationSong) {
      this.situationSong.pause();
    }
  }
}

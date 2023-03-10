import { Component, Input } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { WebsocketService } from '../core/websockets/websocket.service';
import { Song } from '../data/types';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent {
  @Input() isPlaying = false;
  song$ = this.ws.playerState$.pipe(
    map((state) => {
      if (!state?.playingSongAt) return;
      return state.playlist[state.playingSongAt] as Song;
    }),
    filter((state) => state != null),
  ) as Observable<Song>;

  durationMs$ = this.song$.pipe(
    map((song) => {
      return song.durationMS;
    }),
  );
  songSeek = 0;
  setIntervalConst = 100;
  interval: any;

  constructor(private ws: WebsocketService) {
    if (this.isPlaying)
      this.interval = setInterval(
        () => (this.songSeek += this.setIntervalConst),
        this.setIntervalConst,
      );
  }

  togglePlayPause() {
    const playingSongAt = this.ws.playerState?.playingSongAt;
    if (!playingSongAt) return;

    if (this.isPlaying) {
      clearInterval(this.interval);
      this.ws.StopCommand({
        action: 'Stop',
        payload: null,
        emittedAt: new Date(),
      });
    } else {
      this.ws.PlaySongAtCommand({
        action: 'PlaySongAt',
        payload: { playSongAt: playingSongAt },
        emittedAt: new Date(),
      });
      this.songSeek = 0;
      this.interval = setInterval(
        () => (this.songSeek += this.setIntervalConst),
        this.setIntervalConst,
      );
    }
    this.isPlaying = !this.isPlaying;
  }

  next() {
    const playingSongAt = this.ws.playerState?.playingSongAt;
    const playlist = this.ws.playerState?.playlist ?? [];
    if (!playingSongAt) return;

    this.ws.PlaySongAtCommand({
      action: 'PlaySongAt',
      payload: {
        playSongAt: ((playingSongAt + 1) % playlist.length) + 1,
      },
      emittedAt: new Date(),
    });
  }

  previous() {
    const playingSongAt = this.ws.playerState?.playingSongAt;
    const playlist = this.ws.playerState?.playlist ?? [];
    if (!playingSongAt) return;

    this.ws.PlaySongAtCommand({
      action: 'PlaySongAt',
      payload: {
        playSongAt:
          ((playingSongAt + playlist.length - 1) % playlist.length) + 1,
      },
      emittedAt: new Date(),
    });
  }

  handleSeekChanged(ev: any) {
    console.log(ev);
  }
}

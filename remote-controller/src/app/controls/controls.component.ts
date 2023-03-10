import { Component, Input } from '@angular/core';
import { WebsocketService } from '../core/websockets/websocket.service';
import { Song } from '../data/types';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent {
  @Input() isPlaying = false;
  @Input() song!: Song;

  constructor(private ws: WebsocketService) {}

  togglePlayPause() {
    if (this.isPlaying) {
      this.ws.StopCommand({
        action: 'Stop',
        payload: null,
        emittedAt: new Date(),
      });
    } else if (this.ws.playerState) {
      this.ws.PlaySongAtCommand({
        action: 'PlaySongAt',
        payload: { playSongAt: this.ws.playerState?.playingSongAt },
        emittedAt: new Date(),
      });
    }
    this.isPlaying = !this.isPlaying;
  }

  next() {
    if (this.ws.playerState) {
      this.ws.PlaySongAtCommand({
        action: 'PlaySongAt',
        payload: {
          playSongAt:
            (this.ws.playerState.playingSongAt + 1) %
            this.ws.playerState.playlist.length,
        },
        emittedAt: new Date(),
      });
    }
  }

  previous() {
    if (this.ws.playerState) {
      this.ws.PlaySongAtCommand({
        action: 'PlaySongAt',
        payload: {
          playSongAt:
            (this.ws.playerState.playingSongAt +
              this.ws.playerState.playlist.length -
              1) %
            this.ws.playerState.playlist.length,
        },
        emittedAt: new Date(),
      });
    }
  }
  handleSeekChanged(ev: any) {
    console.log(ev);
  }
}

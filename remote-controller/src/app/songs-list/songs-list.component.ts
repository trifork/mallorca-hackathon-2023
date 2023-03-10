import { Component, HostBinding } from '@angular/core';
import { tap } from 'rxjs';
import { WebsocketService } from '../core/websockets/websocket.service';
import { PlayerState, Song } from '../data/types';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css'],
})
export class SongsListComponent {
  playerState$ = this.websocketService.playerState$.pipe(
    tap((data) => console.log(data)),
  );
  constructor(private websocketService: WebsocketService) {}
  onNewSongSelected(newIndex: number) {
    this.websocketService.PlaySongAtCommand({
      action: 'PlaySongAt',
      emittedAt: new Date(),
      payload: {
        playSongAt: newIndex,
      },
    });
  }
}

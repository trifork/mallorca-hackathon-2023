import { Component } from '@angular/core';
import { map } from 'rxjs';
import { WebsocketService } from './core/websockets/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showPlaylist = true;
  title = 'SUPER MUSIC PLAYER';

  isPlaying$ = this.websocket.playerState$.pipe(
    map((it) => it?.state === 'playing'),
  );
  constructor(private websocket: WebsocketService) {}

  handleSeekChanged(event: any) {
    console.log(event);
  }
}

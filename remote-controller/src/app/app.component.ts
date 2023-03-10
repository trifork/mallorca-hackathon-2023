import { Component } from '@angular/core';
import { WebsocketService } from './core/websockets/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showPlaylist = true;
  title = 'SUPER MUSIC PLAYER';

  constructor(private websocket: WebsocketService) {
    this.websocket.playerState$.subscribe((playerState) =>
      console.log(playerState),
    );
  }

  handleSeekChanged(event: any) {
    console.log(event);
  }
}

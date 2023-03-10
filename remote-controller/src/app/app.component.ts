import { Component } from '@angular/core';
import { WebsocketService } from './core/websockets/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'remote-controller';

  constructor(private websocket: WebsocketService) {
    this.websocket.playerState$.subscribe((playerState) =>
      console.log(playerState),
    );
  }
}

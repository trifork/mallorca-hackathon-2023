import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlayerState, PlayerCommand } from 'src/app/data/types';

const API_PLAYER = 'ws://192.168.1.47:8000/api/player';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private websocket = new WebSocket(API_PLAYER);
  private subject = new BehaviorSubject<PlayerState | null>(null);

  public get playerState() {
    return this.subject.getValue();
  }

  public playerState$ = this.subject.asObservable();

  constructor() {
    this.websocket.onmessage = (event) => {
      let wsMessage = JSON.parse(event.data) as PlayerState;
      this.subject.next(wsMessage);
    };
    this.websocket.onerror = (event) => {
      console.log('Morio', event);
    };
  }

  sendCommand(command: PlayerCommand) {
    this.websocket.send(JSON.stringify(command));
  }
}

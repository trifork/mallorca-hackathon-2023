import { Component } from '@angular/core';
import { Song } from './songs-list/songs-list.component';

export interface State {
  playlist: Song[];
  playingSong: Song;
  state: string;
  emittedAt: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'SUPER MUSIC PLAYER';
}

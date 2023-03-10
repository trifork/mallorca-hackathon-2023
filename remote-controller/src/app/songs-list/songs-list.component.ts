import { Component, HostBinding } from '@angular/core';
import { PlayerState, Song } from '../data/types';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css'],
})
export class SongsListComponent {
  playerState: PlayerState = {
    playlist: ['supersong1', 'supersong2', 'supersong2'].map((name, index) => ({
      fileName: name,
      durationMS: index * 1000,
      src: `fakeSource for ${name}`,
    })),
    playingSong: 'supersong2',
    state: 'playing',
    emittedAt: new Date(),
  };
}

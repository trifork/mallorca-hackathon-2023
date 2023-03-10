import { Component } from '@angular/core';

export interface Song {
  name: string;
}

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css'],
})
export class SongsListComponent {
  songs: Song[] = [
    {
      name: 'supersong1',
    },
    {
      name: 'supersong2',
    },
  ];
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Song } from 'src/app/data/types';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css'],
})
export class SongComponent {
  @Input() selected!: boolean;
  @Input() song!: Song;
  @Output() clicked = new EventEmitter<Song>();
}

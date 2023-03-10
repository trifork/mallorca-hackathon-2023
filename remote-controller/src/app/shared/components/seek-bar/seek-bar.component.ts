import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-seek-bar',
  templateUrl: './seek-bar.component.html',
  styleUrls: ['./seek-bar.component.css'],
})
export class SeekBarComponent {
  @Input() songInSeconds = 100;
  @Output() seekChangedEvent = new EventEmitter<number>();
}

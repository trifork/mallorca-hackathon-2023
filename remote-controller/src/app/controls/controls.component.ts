import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent {
  @Input() isPlaying = false;
  @Input() song: any;

  togglePlayPause() {
    //this.soundManager.togglePlayPause();
  }

  next() {
    //this.soundManager.next();
  }

  previous() {
    //this.soundManager.previous();
  }
  handleSeekChanged(ev: any) {
    console.log(ev);
  }
}

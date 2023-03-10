import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeekBarComponent } from './components/seek-bar/seek-bar.component';

@NgModule({
  declarations: [SeekBarComponent],
  imports: [CommonModule],
  exports: [SeekBarComponent],
})
export class SharedModule {}

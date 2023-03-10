import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SongsListComponent } from './songs-list/songs-list.component';
import { ControlsComponent } from './controls/controls.component';
import { UploadSongComponent } from './components/upload-song/upload-song.component';
import { SongComponent } from './songs-list/song/song.component';

@NgModule({
  declarations: [
    AppComponent,
    SongsListComponent,
    SongComponent,
    ControlsComponent,
    UploadSongComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

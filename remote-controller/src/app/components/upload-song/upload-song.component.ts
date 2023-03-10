import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { UploadService } from 'src/app/upload.service';

@Component({
  selector: 'app-upload-song',
  templateUrl: './upload-song.component.html',
  styleUrls: ['./upload-song.component.css'],
})
export class UploadSongComponent {
  fileToUpload: File | null = null

  songUploadForm = this.formBuilder.group({
    song: ''
  })
  
  constructor(private uploadService: UploadService, private formBuilder: FormBuilder) {}

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement
    let fileList: FileList | null = element.files
    if(fileList) {
      this.fileToUpload = fileList?.item(0)
    }
  }

  onSubmit() {
    const formData: FormData = new FormData()
    if(this.fileToUpload) {
      formData.append('file', this.fileToUpload, this.fileToUpload.name)
      this.uploadService.addSong(formData)
    }
  }
}

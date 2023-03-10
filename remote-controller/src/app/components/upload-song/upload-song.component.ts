import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { UploadService } from 'src/app/upload.service';

@Component({
  selector: 'app-upload-song',
  templateUrl: './upload-song.component.html',
  styleUrls: ['./upload-song.component.css'],
})
export class UploadSongComponent {
  dragAreaClass: string = 'dragarea';
  error: string | null = null;
  fileToUpload: File | null = null;

  @Output() successfulUpload = new EventEmitter();

  songUploadForm = this.formBuilder.group({
    song: '',
  });

  constructor(
    private uploadService: UploadService,
    private formBuilder: FormBuilder,
  ) {}

  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragenter', ['$event']) onDragEnter(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragend', ['$event']) onDragEnd(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('drop', ['$event']) onDrop(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      if (files.item(0)?.type == 'audio/mpeg') {
        this.error = '';
        this.fileToUpload = files?.item(0);
      } else {
        this.error = 'Not an audio file';
      }
      console.log(this.fileToUpload);
    }
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      if (fileList.item(0)?.type == 'audio/mpeg') {
        this.error = '';
        this.fileToUpload = fileList?.item(0);
      } else {
        this.error = 'Not an audio file';
      }
    }
  }

  onSubmit() {
    const formData: FormData = new FormData();
    if (this.fileToUpload) {
      formData.append('file', this.fileToUpload, this.fileToUpload.name);
      firstValueFrom(this.uploadService.addSong(formData)).then((success) => {
        this.successfulUpload.emit(success);
      });
    }
  }
}

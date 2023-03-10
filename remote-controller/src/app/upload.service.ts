import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private API_URL = 'http://localhost:4200/api/playlist';

  constructor(private httpClient: HttpClient) {}

  addSong(formData: FormData) {
    return this.httpClient.post(this.API_URL, formData);
  }
}

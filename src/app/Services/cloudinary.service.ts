import { Injectable } from '@angular/core';
declare var cloudinary: any;
@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  private cloudName = "vcart";
  private uploadPreset = "ecommerce";

  constructor() {}

  openUploadWidget(callback: (error: any, result: any) => void): void {
    const options = {
      cloudName: this.cloudName,
      uploadPreset: this.uploadPreset,
      sources: ['local', 'url', 'camera', 'google_drive'],
      multiple: false,
      folder: 'angular_uploads', // Optional
      maxFileSize: 2000000, // 2MB limit
      resourceType: 'image',
      clientAllowedFormats: ['jpg', 'jpeg', 'png'],
    };

    cloudinary.openUploadWidget(options, callback);
  }
}

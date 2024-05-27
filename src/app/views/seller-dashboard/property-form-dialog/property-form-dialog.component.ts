// src/app/property-form-dialog/property-form-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import { CloudinaryService } from 'src/app/Services/cloudinary.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-property-form-dialog',
  templateUrl: './property-form-dialog.component.html',
  styleUrls: ['./property-form-dialog.component.css']
})
export class PropertyFormDialogComponent implements OnInit {
  propertyForm: FormGroup;
  photoUrl: string = "";
  userName: String = "";
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PropertyFormDialogComponent>,
    private apiService: ApiServiceService,
    private cloudinaryService: CloudinaryService,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) private input:any
  ) {
    this.propertyForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      country: ['', Validators.required],
      numberOfBedRooms: ['', [Validators.required, Validators.min(1)]],
      numberOfBathrooms: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      photo: ['', Validators.required]
    });
    commonService.userName.subscribe((name)=>{
       this.userName = name;
    })
    if(input.action === "edit"){
      let property = input.propertyDetails;
      this.propertyForm.controls.address.setValue(property.address);
      this.propertyForm.controls.city.setValue(property.city);
      this.propertyForm.controls.state.setValue(property.state);
      this.propertyForm.controls.zipCode.setValue(property.zipCode);
      this.propertyForm.controls.country.setValue(property.country);
      this.propertyForm.controls.numberOfBedRooms.setValue(property.numberOfBedRooms);
      this.propertyForm.controls.numberOfBathrooms.setValue(property.numberOfBathrooms);
      this.propertyForm.controls.description.setValue(property.description);
      this.propertyForm.controls.price.setValue(property.price);
      this.propertyForm.controls.photo.setValue(property.photo);
      this.photoUrl = property.photo;
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.propertyForm.valid) {
      let propertyValues = {
        address: this.propertyForm.controls.address.value,
        city: this.propertyForm.controls.city.value,
        state: this.propertyForm.controls.state.value,
        zipCode: this.propertyForm.controls.zipCode.value,
        country: this.propertyForm.controls.country.value,
        numberOfBedRooms: this.propertyForm.controls.numberOfBedRooms.value,
        numberOfBathrooms: this.propertyForm.controls.numberOfBathrooms.value,
        description: this.propertyForm.controls.description.value,
        price: this.propertyForm.controls.price.value,
        photo: this.propertyForm.controls.photo.value,
        user:{
          userName: this.userName
        }
      }
      if(this.input.action === "add"){
        this.apiService.addProperty(propertyValues).subscribe((res)=>{
          this.dialogRef.close(this.propertyForm.value);
        })
      }
      else{
        this.apiService.updateProperty(propertyValues, this.input.propertyDetails.id).subscribe((res)=>{
          this.dialogRef.close(this.propertyForm.value);
        })
      }
    } else {
      this.propertyForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  uploadImage() {
    this.cloudinaryService.openUploadWidget((error, result) => {
      if (error) {
        alert("Error while uploading")
      } else if (result.event === 'success') {
        this.photoUrl = result.info.secure_url;
        this.propertyForm.controls.photo.setValue (result.info.secure_url);
      }
    });
  }
}

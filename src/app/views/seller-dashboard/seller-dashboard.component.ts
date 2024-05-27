import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PropertyFormDialogComponent } from './property-form-dialog/property-form-dialog.component';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent {
  public userType: any;
  public properties: any[] = [];
  constructor(private router: Router, private dialog: MatDialog, public apiService: ApiServiceService,
              private commonService: CommonService
  ){
  }

  ngOnInit(){
    this.commonService.role.subscribe((res)=>{
     if(res===null)
      this.logout();
      
    })
    this.apiService.getAllProperties().subscribe((res)=>{
      this.properties = res;
    })
  }
  
  logout(){
    this.router.navigate(["/login"]);
    sessionStorage.clear();
  }

  addProperty(){
      const dialogRef = this.dialog .open(PropertyFormDialogComponent, {
        width: '800px',
        height: '500px',
        panelClass: "add-product-dialog",
        data: {action: "add", propertyDetails: null}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.apiService.getAllProperties().subscribe((res)=>{
          this.properties = res;
        })
      });
  }

  editProperty(property: any){
    const dialogRef = this.dialog .open(PropertyFormDialogComponent, {
      width: '800px',
      height: '500px',
      panelClass: "add-product-dialog",
      data: {action: "edit", propertyDetails: property}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.apiService.getAllProperties().subscribe((res)=>{
        this.properties = res;
      })
    });
  }

  deleteProperty(property: any){
    this.apiService.deleteProperty(property.id).subscribe((res)=>{
      this.apiService.getAllProperties().subscribe((res)=>{
        this.properties = res;
      })
    });
  }
}

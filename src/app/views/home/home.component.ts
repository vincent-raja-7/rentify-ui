import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import { CommonService } from 'src/app/Services/common.service';
import { Filter } from 'src/app/view-models/Constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  filterForm: FormGroup;
  showModal = false;
  public properties: any[] = [];
  public tempProperties: any[] = [];
  public isPropertyLiked: boolean[] =[];
  selectedProperty : any = null;
  constructor(private router: Router, public apiService: ApiServiceService, private commonService: CommonService
    , private fb: FormBuilder
  ){

  }

  ngOnInit(){
    this.apiService.getAllProperties().subscribe((res)=>{
      this.properties = res;
      this.tempProperties = res;
      res.forEach((l: any, index:number) => {
        this.isPropertyLiked[index] = false;
      });
    })
    this.commonService.role.subscribe((res)=>{
      if(res===null)
       this.logout();
     })
     this.filterForm = this.fb.group({
      price: [''],
      bedrooms: [''],
      bathrooms: ['']
    });
  }

  logout(){
    this.router.navigate(["/login"]);
    sessionStorage.clear();
  }

  onSubmit(): void {
    const filter: Filter = this.filterForm.value;
    this.tempProperties = [...this.properties];
    this.tempProperties = this.getProperties(filter);
  }
  
  getProperties(filter: Filter): any[] {
    return this.properties.filter(property => {
      return (filter.price === '' || this.priceInRange(property.price, filter.price)) &&
             (filter.bedrooms === '' || property.numberOfBedRooms === +filter.bedrooms || (filter.bedrooms === '4' && property.numberOfBedRooms >= 4)) &&
             (filter.bathrooms === '' || property.numberOfBathrooms === +filter.bathrooms || (filter.bathrooms === '3' && property.numberOfBathrooms >= 3));
    });
  }

  priceInRange(price: number, range: string): boolean {
    switch (range) {
      case '1': return price >= 1000 && price <= 5000;
      case '2': return price >= 10000 && price <= 50000;
      case '3': return price >= 100000 && price <= 500000;
      default: return true;
    }
  }

  openModal(property: any): void {
    this.selectedProperty = property;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  addLike(property: any, i: number){
     if(!this.isPropertyLiked[i]){
      this.apiService.updateLikes(property.id, property).subscribe((res)=>{
        this.isPropertyLiked[i]=true;
        this.apiService.getAllProperties().subscribe((res)=>{
        this.properties = res;
        this.tempProperties = res;
      })
    })
     }
  }

}

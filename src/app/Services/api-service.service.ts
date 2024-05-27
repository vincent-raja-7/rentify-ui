import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginDetails } from '../view-models/UserLoginDetails';
import { API } from '../view-models/Constants';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  
  public BaseURL = API.prodBaseURL;

  constructor(public http: HttpClient) { }

  httpGetHelp(apiURL: string): Observable<any> {
    return this.http.get<any>(this.BaseURL+apiURL);
  }

  httpPostHelp(apiURL: string, data: any): Observable<any> {
    return this.http.post<any>(this.BaseURL+apiURL, data);
  }
  
  httpPutHelp(apiURL: string, data: any): Observable<any> {
    return this.http.put<any>(this.BaseURL+apiURL, data);
  }

  httpPatchHelp(apiURL: string, data: any): Observable<any> {
    return this.http.patch<any>(this.BaseURL+apiURL, data);
  }

  httpDeleteHelp(apiURL: string): Observable<any> {
    return this.http.delete<any>(this.BaseURL+apiURL);
  }

  authenticateUser(userLoginDetails: UserLoginDetails): Observable<any>{
    let apiURL = "authenticate"
    return this.httpPostHelp(apiURL, userLoginDetails);
  }

  registerUser(userDetais: any, userType: string): Observable<any>{
    let apiURL = "register?typeOfUser="+userType;
    return this.httpPostHelp(apiURL, userDetais);
  }

  getAllProperties(): Observable<any>{
    let apiURL = "api/properties";
    return this.httpGetHelp(apiURL);
  }

  addProperty(property: any):Observable<any>{
    let apiURL = "api/properties";
    return this.httpPostHelp(apiURL, property);
  }

  updateProperty(property: any, id:number){
    let apiURL = "api/properties/"+id;
    return this.httpPutHelp(apiURL, property);
  }

  deleteProperty(id: number): Observable<any>{
    let apiURL = "api/properties/"+id;
    console.log("del");
    
    return this.httpDeleteHelp(apiURL);
  }

  updateLikes(id: number, property: any): Observable<any>{
    let apiURL = "api/properties/"+id;
    return this.httpPatchHelp(apiURL, property);
  }

}

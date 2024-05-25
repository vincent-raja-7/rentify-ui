import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginDetails } from '../view-models/UserLoginDetails';
import { API } from '../view-models/Constants';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(public http: HttpClient) { }

  httpGetHelp(apiURL: string): Observable<any> {
    return this.http.get<any>(API.prodBaseURL+apiURL);
  }

  httpPostHelp(apiURL: string, data: any): Observable<any> {
    return this.http.post<any>(API.prodBaseURL+apiURL, data);
  }

  authenticateUser(userLoginDetails: UserLoginDetails): Observable<any>{
    let apiURL = "/authenticate"
    return this.httpPostHelp(apiURL, userLoginDetails);
  }

  registerUser(userDetais: any, userType: string): Observable<any>{
    let apiURL = "/register?typeOfUser="+userType;
    return this.httpPostHelp(apiURL, userDetais);
  }


}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public role = new BehaviorSubject<String>("");
  public userName = new BehaviorSubject<String>("");
  constructor() { }

  setUserRole(args: any){
    this.role.next(args);
  }

  setUserName(args: any){
    this.userName.next(args);
  }
}

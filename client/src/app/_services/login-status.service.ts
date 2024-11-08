import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {

  // BehaviourSubject to always hold the latest value and update immediately whenever a new component subscribes to it
  private loggedIn = new BehaviorSubject<boolean>(false); 
  loginStatus = this.loggedIn.asObservable();

  setLoginStatus(status: boolean) {
    this.loggedIn.next(status);
  }
  
}

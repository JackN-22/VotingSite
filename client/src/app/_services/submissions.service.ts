import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { ThankYous } from '../models/thankyous';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubmissionsService {
  private http = inject(HttpClient);
  API_URL = environment.API_URL;
  
  submitShiningStar(username: string){
    return this.http.post<User>(`${this.API_URL}shiningstar/${username}`, null);
  }

  submitThankYous(thankyou: ThankYous) {
    return this.http.put<any>(`${this.API_URL}thankyous`, thankyou);
  }

  // private getToken(): string {
  //   const userJson = localStorage.getItem('user');
  //   if (userJson) {
  //     const user: User = JSON.parse(userJson);
  //     return user.token;
  //   }
  //   return '';
  // }
}

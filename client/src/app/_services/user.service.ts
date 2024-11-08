import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ThankYous } from '../models/thankyous';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient)
  API_URL = environment.API_URL;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}shiningstar`)
  }

  getThankYouData() {
    return this.http.get<ThankYous[]>(`${this.API_URL}admin/thankyous`)
  }
}

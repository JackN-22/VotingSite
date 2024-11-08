import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { LoginStatusService } from './login-status.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null)
  private router = inject(Router);
  private loginStatusService = inject(LoginStatusService);
  model: any = {};
  API_URL = environment.API_URL;

  login(model: any) {
    return this.http.post<User>(`${this.API_URL}account/login`, model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
          this.loginStatusService.setLoginStatus(true);
          this.router.navigateByUrl('/home');
        }
      })
    )
  }
  register(model: any) {
    return this.http.post<User>(`${this.API_URL}account/register`, model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.loginStatusService.setLoginStatus(false);
    this.router.navigateByUrl('/login');

  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { LoginStatusService } from '../../_services/login-status.service';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../_services/account.service';
import { User } from '../../models/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
   loginStatusService = inject(LoginStatusService);
   accountService = inject(AccountService);

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      this.accountService.setCurrentUser(user);
    }
    this.loginStatusService.loginStatus.subscribe(status => {
      this.isLoggedIn = status;
    })
  }

  logout() {
    this.accountService.logout();
  }


}

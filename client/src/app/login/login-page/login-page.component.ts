import { Component, EventEmitter, inject, Input, output, Output } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginStatusService } from '../../_services/login-status.service';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  accountService = inject(AccountService)
  private router = inject(Router);
  model: any = {};
  private loginStatusService = inject(LoginStatusService);

  login() {
    if (!this.model.username == null || !this.model.password) {
      return;
    } else {
      this.accountService.login(this.model).subscribe({
        next: () => {
          this.router.navigateByUrl('/home')
          this.loginStatusService.setLoginStatus(true);
        }
        })
    }
  }
}

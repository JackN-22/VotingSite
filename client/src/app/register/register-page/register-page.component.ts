import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AccountService } from '../../_services/account.service';
import { LoginStatusService } from '../../_services/login-status.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, RouterModule, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  private accountService = inject(AccountService);
  private loginStatusService = inject(LoginStatusService);
  private router = inject(Router)
  model: any = {};

  register() {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.loginStatusService.setLoginStatus(true);
        this.router.navigateByUrl('/home');
      }
    })
  }
}

import { Routes } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { RegisterPageComponent } from './register/register-page/register-page.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { ThankyouspageComponent } from './thankyous/thankyouspage/thankyouspage.component';
import { AdminpageComponent } from './admin/adminpage/adminpage.component';

export const routes: Routes = [
    { path: '', component: LoginPageComponent},
    { path: 'register', component: RegisterPageComponent},
    { path: 'home', component: HomePageComponent},
    { path: 'thankyous', component: ThankyouspageComponent},
    { path: 'admin', component: AdminpageComponent},
]



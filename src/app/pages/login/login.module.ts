import { LoginComponent } from './components/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutes } from './login.routing';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes)
  ]
})
export class LoginModule { }

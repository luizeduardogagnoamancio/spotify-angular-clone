import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verificarTokenUrlCallback();
  }

  verificarTokenUrlCallback() {
    const token = this.loginService.obterTokenUrlCallback();
    if (!!token) { //transforma verificacao em boolean
      this.loginService.definirAccessToken(token);
      this.router.navigate(['/player']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  abrirPaginaLogin() {
    window.location.href = this.loginService.obterUrlLogin();
  }
}

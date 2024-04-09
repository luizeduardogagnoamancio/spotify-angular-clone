import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/services/login.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor(private loginService: LoginService) {

  }

  ngOnInit() {

  }
}

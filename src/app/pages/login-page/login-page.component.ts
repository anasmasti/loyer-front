import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor( private mainModalService: MainModalService) { }

  ngOnInit(): void {
    this.mainModalService.open();
  }

  login() {

  }

}

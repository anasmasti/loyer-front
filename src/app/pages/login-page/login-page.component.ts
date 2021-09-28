import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from './../../services/auth-service/auth.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private mainModalService: MainModalService,
    private authService: AuthService
  ) { }

  loginForm!: FormGroup;
  matricule!: string

  ngOnInit(): void {
    this.mainModalService.open();

    this.loginForm = new FormGroup({
      Matricule: new FormControl('', [])
    });

    this.matricule = localStorage.getItem('matricule') || '';
  }

  login() {
    let matricule = this.loginForm.get('Matricule')?.value

    if (!this.matricule) {
      localStorage.setItem('matricule', matricule);
    }
    
    this.authService.logIn().subscribe()
  }

  removeUser() {
    localStorage.removeItem('matricule')
    this.loginForm.reset()
    this.matricule = ''
  }

}

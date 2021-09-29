import { HelperService } from './../../services/helpers/helper.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from './../../services/auth-service/auth.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private mainModalService: MainModalService,
    private authService: AuthService,
    public router: Router,
    private helperService: HelperService,
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
      this.matricule = matricule
    }

    this.authService.logIn(this.matricule).subscribe(data => {
      localStorage.setItem('user', JSON.stringify(data))
      this.router.navigate(['/']);
    })
  }

  removeUser() {
    localStorage.removeItem('matricule')
    this.loginForm.reset()
    this.matricule = ''
  }

}

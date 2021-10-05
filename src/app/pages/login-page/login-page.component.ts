import { HelperService } from './../../services/helpers/helper.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  hasError!: boolean
  errorMessage!: string

  ngOnInit(): void {
    this.mainModalService.open();

    this.loginForm = new FormGroup({
      Matricule: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required, Validators.maxLength(8)])
    });

    this.matricule = localStorage.getItem('matricule') || '';
  }

  login() {
    let matricule = this.loginForm.get('Matricule')?.value
    let password = this.loginForm.get('Password')?.value
    let data: any

    if (!this.matricule) {
      localStorage.setItem('matricule', matricule);
      this.matricule = matricule
    }

    data = {
      matricule: this.matricule,
      password: password
    }

    this.authService.logIn(data).subscribe(data => {
      localStorage.setItem('user', JSON.stringify(data))
      this.router.navigate(['/']).then(() => {
        this.helperService.refrechPage()
      });
    }, error => {
      this.hasError = true
      this.errorMessage = error.error.message
      setTimeout(() => {
        this.hasError = false
        this.errorMessage = ''
      }, 3000);
    })

    // setTimeout(() => {
    //   setInterval(() => {
    //     localStorage.clear()

    //     this.authService.logIn(this.matricule).subscribe(data => {
    //       localStorage.setItem('user', JSON.stringify(data))
    //     })
    //   }, 7000)
    // }, 259200);
  }

  // Check if all inputs has invalid errors
  checkInputsValidation(targetInput: any) {
    return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
  }

  removeUser() {
    localStorage.removeItem('matricule')
    this.loginForm.reset()
    this.matricule = ''
  }

  get Password() {
    return this.loginForm.get('Password');
  }
  get Matricule() {
    return this.loginForm.get('Matricule');
  }

}

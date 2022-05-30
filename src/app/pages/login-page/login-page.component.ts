import { HelperService } from './../../services/helpers/helper.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth-service/auth.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  matricule!: string;
  hasError!: boolean;
  errorMessage!: string;

  showPass: boolean;

  constructor(
    private mainModalService: MainModalService,
    private authService: AuthService,
    public router: Router,
    private helperService: HelperService
  ) {
    this.showPass = false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.mainModalService.open();
    }, 100);

    this.loginForm = new FormGroup({
      Matricule: new FormControl('', [Validators.required]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.matricule = localStorage.getItem('matricule') || '';
  }

  login() {
    let matricule = this.loginForm.get('Matricule')?.value;
    let password = this.loginForm.get('Password')?.value;
    let data: any;

    if (!this.matricule) {
      localStorage.setItem('matricule', matricule);
      this.matricule = matricule;
    }

    data = {
      matricule: this.matricule,
      password: password,
    };

    this.authService.logIn(data).subscribe(
      (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        // let user: any = localStorage.getItem('user');
        // let userRoles = JSON.parse(user);
        // let isAdmin: boolean = false;

        // userRoles.existedUser.userRoles.forEach((role: any) => {
        //   if (role.roleCode == 'Admin' && !role.deleted) {
        //     isAdmin = true;
        //     return;
        //   }
        // });

        this.goTo('');
      },
      (error) => {
        this.hasError = true;
        this.errorMessage = error.error.message;
        setTimeout(() => {
          this.hasError = false;
          this.errorMessage = '';
        }, 3000);
      }
    );

    // setTimeout(() => {
    //   setInterval(() => {
    //     localStorage.clear()

    //     this.authService.logIn(this.matricule).subscribe(data => {
    //       localStorage.setItem('user', JSON.stringify(data))
    //     })
    //   }, 7000)
    // }, 259200);
  }

  goTo(routeType: string) {
    this.router.navigate([`/${routeType}`]).then(() => {
      this.helperService.refrechPage();
    });
  }

  // Check if all inputs has invalid errors
  checkInputsValidation(targetInput: any) {
    return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
  }

  removeUser() {
    localStorage.removeItem('matricule');
    this.loginForm.reset();
    this.matricule = '';
  }

  showPassword() {
    this.showPass = !this.showPass;
  }

  get Password() {
    return this.loginForm.get('Password');
  }
  get Matricule() {
    return this.loginForm.get('Matricule');
  }
}

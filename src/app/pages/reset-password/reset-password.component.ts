import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth-service/auth.service';
import { ReserPasswordValidators } from './reset-password.validation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetpasswordForm = new FormGroup(
    {
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirm_password: new FormControl(null, [Validators.required]),
    },
    [ReserPasswordValidators.matchValidator('password', 'confirm_password')]
  );
  passwordField: boolean;
  confirmPasswordField: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.passwordField = false;
    this.confirmPasswordField = false;
  }

  ngOnInit(): void {}

  updatePassword() {
    let userId = this.activatedRoute.snapshot.paramMap.get('userId') || '';

    this.authService
      .updateUserPassword(userId, {
        password: this.resetpasswordForm.get('password')?.value,
      })
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

  toggleShowPassword() {
    this.passwordField = !this.passwordField;
  }

  toggleShowComfirmPassword() {
    this.confirmPasswordField = !this.confirmPasswordField;
  }

  get password() {
    return this.resetpasswordForm.get('password');
  }
  get confirm_password() {
    return this.resetpasswordForm.get('confirm_password');
  }
}

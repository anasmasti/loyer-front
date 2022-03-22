import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@services/auth-service/auth.service';
import { UserService } from '@services/user-service/user-service.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit {
  isNameClicked: boolean = false;
  isEmailClicked: boolean = false;
  isPrenomClicked: boolean = false;
  user!: User;
  userForm: FormGroup;
  errors!: string;
  updateDone: boolean = false;
  updateSucces: string = 'Profile modifié avec succés';
  updatePassword: boolean = false;
  userMatricule: any = localStorage.getItem('matricule');

  // Password toggle variables
  showPass: boolean;
  showNewPass: boolean;
  showConfPass: boolean;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      email: new FormControl(''),

      // Password
      password: new FormControl(''),
      new_password: new FormControl(''),
      confirmation_password: new FormControl(''),
    });

    this.showPass = false;
    this.showNewPass = false;
    this.showConfPass = false;
  }

  ngOnInit(): void {
    this.fetchUserInfo();
  }

  fetchUserInfo() {
    this.user = this.userService.getUserInfo();
    console.log(this.user);

    this.userForm.patchValue({
      nom: this.user.nom,
      prenom: this.user.prenom,
      email: this.user.email,
    });
  }

  toggelEdit(field: string) {
    switch (field) {
      case 'nom':
        this.isNameClicked = !this.isNameClicked;
        break;
      case 'prenom':
        this.isPrenomClicked = !this.isPrenomClicked;
        break;
      case 'email':
        this.isEmailClicked = !this.isEmailClicked;
        break;
      default:
        break;
    }
  }

  updateUser(userPassword: string) {
    let userData: User = {
      _id: this.user._id,
      deleted: this.user.deleted,
      userMatricul: this.user.userMatricul,
      nom: this.userForm.get('nom')?.value,
      prenom: this.userForm.get('prenom')?.value,
      email: this.userForm.get('email')?.value,
      userRoles: this.user.userRoles,
      password: userPassword,
    };

    this.userService
      .updateProfile(userData, this.user._id, this.userMatricule)
      .subscribe(
        (data) => {
          this.updateDone = true;
          console.log(userData);
          this.authService.setUserIntoLocalStorage(userData);
          localStorage.removeItem('user');
          localStorage.setItem(
            'user',
            JSON.stringify({ isLogged: true, existedUser: userData })
          );
          setTimeout(() => {
            this.userForm.reset();
            this.updateDone = false;
            location.reload();
          }, 3000);
        },
        (error) => {
          this.errors = error.error.message;
          setTimeout(() => {
            this.showErrorMessage();
          }, 3000);
          this.hideErrorMessage();
        }
      );
  }

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  // Update password
  updatePasswordToggel(value: boolean) {
    this.updatePassword = value;
  }

  // Check the validation of the old password and the confirmation of the new one
  confirmationPassword() {
    let errorMsg = '';
    if (this.updatePassword) {
      if (this.userForm.get('password')?.value == this.user.password) {
        if (
          this.userForm.get('new_password')?.value ==
          this.userForm.get('confirmation_password')?.value
        ) {
          this.updateUser(this.userForm.get('new_password')?.value);
        } else errorMsg = 'Confirmation du mot de passe échoué';
      } else errorMsg = 'Mot de passe incorrect';
    } else {
      this.updateUser(this.user.password);
    }

    if (errorMsg != '') {
      this.errors = errorMsg;
      setTimeout(() => {
        this.showErrorMessage();
      }, 3000);
      this.hideErrorMessage();
    }
  }

  togglePasswordType(name: string) {
    switch (name) {
      case 'pass':
        this.showPass = !this.showPass;
        break;
      case 'newPass':
        this.showNewPass = !this.showNewPass;
        break;
      case 'confPass':
        this.showConfPass = !this.showConfPass;
        break;
      default:
        break;
    }
  }
}

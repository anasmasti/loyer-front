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

  updateUser() {
    let userData: User = {
      _id: this.user._id,
      deleted: this.user.deleted,
      userMatricul: this.user.userMatricul,
      nom: this.userForm.get('nom')?.value,
      prenom: this.userForm.get('prenom')?.value,
      email: this.userForm.get('email')?.value,
      userRoles: this.user.userRoles,
    };

    this.userService
      .updateProfile(userData, this.user._id, this.userMatricule)
      .subscribe(
        (_) => {
          this.updateDone = true;
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
}

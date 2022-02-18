import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  userForm: FormGroup

  constructor(
    private userService: UserService,
    private fb: FormBuilder
    ) {
      this.userForm = this.fb.group({
        nom: new FormControl(''),
        prenom: new FormControl(''),
        email: new FormControl(''),
      })
    }
    
    ngOnInit(): void {
    this.fetchUserInfo()
  }

  fetchUserInfo() {
    this.user = this.userService.getUserInfo();

    this.userForm.patchValue({
      nom : this.user.nom,
      prenom: this.user.prenom,
      email: this.user.email,
    })
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
    
  }
}

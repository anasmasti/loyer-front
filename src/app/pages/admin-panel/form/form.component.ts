
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../../models/User';
import { AdminService } from 'src/app/services/admin-service/admin.service';
@Component({
  selector: 'admin-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {


  user: User = {
    userMatricul: "",
    nom: "",
    prenom: "",
    userRoles: []
  };

  adminForm!: FormGroup;

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.adminForm = new FormGroup({
      Matricule: new FormControl('', []),
      Nom: new FormControl('', []),
      Prenom: new FormControl('', []),
    });
  }

  CheckedRoles(name: any) {
    let roles = [];
    let rolesCH = document.getElementsByClassName('roles');

    for (let index = 0; index < rolesCH.length; index++) {
      if ((rolesCH[index] as HTMLInputElement).checked) {
        roles.push({
          roleName: (rolesCH[index] as HTMLInputElement).value
        });

      }

    }

    return roles;

  }

  listeRoles() {
    let roles = [];
    let rolesCH = document.getElementsByClassName('roles');

    for (let index = 0; index < rolesCH.length; index++) {
      if ((rolesCH[index] as HTMLInputElement).checked) {
        roles.push({
          roleName: (rolesCH[index] as HTMLInputElement).value
        });

      }

    }

    return roles;

  }


  postUserRole() {
    let rolesArray: any = this.listeRoles();
    for (let index = 0; index < rolesArray.length; index++) {
      this.user.userRoles.push(rolesArray[index]);

    }

    this.user.nom = this.adminForm.get('Nom')?.value;
    this.user.prenom = this.adminForm.get('Prenom')?.value;
    this.user.userMatricul = this.adminForm.get('Matricule')?.value;

    this.adminService.addUser(this.user).subscribe();
  }


}

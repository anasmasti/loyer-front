
import { Component, Input, OnInit } from '@angular/core';
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
  errors!: string;
  postDone: boolean = false;
  adminForm!: FormGroup;
  PostSucces: string = 'Utilisateur ajouté avec succés';

  @Input() userR !: any;
  userIsEmpty: boolean = true;

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnChanges() {

    if ((this.userR != 'Ajouter') && (this.userR != null) ) {

      this.fetchUser();
      this.userIsEmpty = false;

    }
    else
    this.userIsEmpty = true;

  }

  ngOnInit(): void {

    this.adminForm = new FormGroup({
      Matricule: new FormControl('', []),
      Nom: new FormControl('', []),
      Prenom: new FormControl('', []),
    });

  }

  fetchUser(){

    console.log('User Data--------------');
    console.log(this.userR);
    console.log('user array-------------');
    console.log(this.user);
    

    this.adminForm.patchValue({

      Matricule: this.userR.userMatricul,
      Nom: this.userR.name,
      Prenom: this.userR.prenom,

    });

  }

  fetchTest(){
    console.log('user array-------------');
    console.log(this.user);
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

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  postUserRole() {
    let rolesArray: any = this.listeRoles();
    for (let index = 0; index < rolesArray.length; index++) {
      this.user.userRoles.push(rolesArray[index]);
    }

    this.user.nom = this.adminForm.get('Nom')?.value;
    this.user.prenom = this.adminForm.get('Prenom')?.value;
    this.user.userMatricul = this.adminForm.get('Matricule')?.value;

    this.adminService.addUser(this.user).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.adminForm.reset();
          this.clearCH();
          this.postDone = false;
        }, 1000);
      },
      (error) => {
        this.errors = error.error.message;
        setTimeout(() => {
          this.showErrorMessage();
        }, 2000);
        this.hideErrorMessage();
      }
    );

  }
   clearCH(){
    let rolesCH = document.getElementsByClassName('roles');
    for (let index = 0; index < rolesCH.length; index++) {
      if ((rolesCH[index] as HTMLInputElement).checked) {
        (rolesCH[index] as HTMLInputElement).checked=false;
      }
    }
    this.user.userRoles = [];
   }

}

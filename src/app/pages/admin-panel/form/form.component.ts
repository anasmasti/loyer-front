
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
  SubmitForm: string = 'Ajouter';
  Role1: boolean = false
  Role2: boolean = false
  Role3: boolean = false
  Role4: boolean = false
  Role5: boolean = false

  @Input() userR !: any;
  userIsEmpty: boolean = true;

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnChanges() {

    if ((this.userR != 'Ajouter') && (this.userR != null) ) {

      this.fetchUser();
      this.userIsEmpty = false;
      this.SubmitForm = 'Modifier'

    }
    else{
      this.userIsEmpty = true;
      this.SubmitForm = 'Ajouter'
      this.Role1 = false;
      this.Role2 = false;
      this.Role3 = false;
      this.Role4 = false;
      this.Role5 = false;
    }

  }

  ngOnInit(): void {

    this.adminForm = new FormGroup({
      Matricule: new FormControl('', []),
      Nom: new FormControl('', []),
      Prenom: new FormControl('', []),
    });

  }

  fetchUser(){
    // console.log(this.userR);

    console.log(this.userR);
    
    
    

    this.Role1 = false;
    this.Role2 = false;
    this.Role3 = false;
    this.Role4 = false;
    this.Role5 = false;
    
    // Fetch Info 
    this.adminForm.patchValue({

      Matricule: this.userR.userMatricul,
      Nom: this.userR.nom,
      Prenom: this.userR.prenom,

    });

    // Fetch Roles
    this.userR.userRoles.forEach((Role : any) => {

      console.log(Role.roleName);
      
      switch (Role.roleName) {

        case "role1": this.Role1 = true ;console.log(Role.roleName);
        break;

        case "role2": this.Role2 = true ; console.log(Role.roleName);
        break;

        case "role3": this.Role3 = true ; console.log(Role.roleName);
        break;

        case "role4": this.Role4 = true ; console.log(Role.roleName);
        break;

        case "role5": this.Role5 = true ; console.log(Role.roleName);
        break;
      
      }
      
    }); 

    console.log("1 : " + this.Role1);
    console.log("2 : " + this.Role2);
    console.log("3 : " + this.Role3);
    console.log("4 : " + this.Role4);
    console.log("5 : " + this.Role5);

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

    console.log(roles);
    

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

    console.log(this.user);
    

    this.adminService.addUser(this.user).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.adminForm.reset();
          this.clearCH();
          this.postDone = false;
          location.reload();
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

  updateUserRole() {
    let rolesArray: any = this.listeRoles();
    for (let index = 0; index < rolesArray.length; index++) {
      this.user.userRoles.push(rolesArray[index]);
    }

    this.user.nom = this.adminForm.get('Nom')?.value;
    this.user.prenom = this.adminForm.get('Prenom')?.value;
    this.user.userMatricul = this.adminForm.get('Matricule')?.value;

    console.log(this.user);
    

    this.adminService.updateUser( this.user , this.userR._id ).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.adminForm.reset();
          this.clearCH();
          this.postDone = false;
          location.reload();
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

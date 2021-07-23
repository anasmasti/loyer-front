import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { AdminService } from 'src/app/services/admin-service/admin.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  
   
   user: User = {
    userMatricul: "",
    nom:"",
    prenom:"",
    userRoles: []
   };

  adminForm: any = new FormGroup({
    // Champs du propriètaire
    Matricule: new FormControl('', []),
    Nom: new FormControl('', [
    ]),
    Prenom: new FormControl('', [
    ]),
    
   
  });

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
   
   
 
    
  }




  CheckedRoles(name:any){
    let roles=[];
    let rolesCH = document.getElementsByClassName('roles') ;

    for (let index = 0; index < rolesCH.length; index++) {
        if( (rolesCH[index] as HTMLInputElement).checked)
        {
          roles.push({
            roleName:(rolesCH[index] as HTMLInputElement).value
          });
          
        }
   
    }


   console.log(roles);
   
    return roles;
    
  }
  listeRoles(){
    let roles=[];
    let rolesCH = document.getElementsByClassName('roles') ;

    for (let index = 0; index < rolesCH.length; index++) {
        if( (rolesCH[index] as HTMLInputElement).checked)
        {
          roles.push({
            roleName:(rolesCH[index] as HTMLInputElement).value
          });
          
        }
   
    }


   console.log(roles);
   
    return roles;
    
  }


  postUserRole(){
    let rolesArray:any  = this.listeRoles();
    for (let index = 0; index < rolesArray.length; index++) {
      this.user.userRoles.push(rolesArray[index]);
      
    }
   

    this.user.nom = this.adminForm.get('Nom').value;
    this.user.prenom = this.adminForm.get('Prenom').value;
    this.user.userMatricul = this.adminForm.get('Matricule').value;


    console.log(this.user);
    
     this.adminService.postUserRole(this.user).subscribe();
  }

  redir(){
    setTimeout(() => {
       location.reload();
    }, 400);
   
  }

 


}

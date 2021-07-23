import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Api-Key-Access': environment.API_ACCESS_KEY,
    })
  };

  
  // Post new UserRole
  postUserRole(data:any){
    return this.http.post(environment.API_URL+environment.API_VERSION+'userRoles/ajouter' , 
    {
      userMatricul:data.userMatricul ,
      nom:data.nom ,  
      prenom:data.prenom ,
      userRoles : data.userRoles
      }, 

      { 'headers': this.httpOptions.headers }
      );
  }

  //getUsers list 
   getUserstList()  {
    return this.http.get(`${environment.API_URL + environment.API_VERSION}/userRoles/all-userRoles `, { 'headers': this.httpOptions.headers });
  }

  //delete user 
  //https://loyer-api.herokuapp.com/api/v1/userRoles/delete-userRoles/:id 
  deleteUserById(id:String)  {
    return this.http.get(`${environment.API_URL + environment.API_VERSION}/userRoles/delete-userRoles/${id}`, { 'headers': this.httpOptions.headers });
  }

 

}

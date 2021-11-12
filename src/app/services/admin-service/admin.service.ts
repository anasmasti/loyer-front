import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/User';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  param_url: string = 'user';

  // Post new UserRole
  addUser(data: User, matricule: any): Observable<User> {
    return this.http.post<User>(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/ajouter/${matricule}`, data);
  }

  // Update new UserRole
  updateUser(data: User, id: any, matricule: any): Observable<User> {
    return this.http.put<User>(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/update/${id}/${matricule}`, data);
  }

  //getUsers list 
  getUsersList(matricule: any): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/all/${matricule}`);
  }

  // Get user by id 
  getUserById(id: String, matricule: any): Observable<User> {
    return this.http.get<User>(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/detail/${id}/${matricule}`);
  }

  //delete user 
  deleteUserById(id: String, matricule: any) {
    return this.http.put(`${environment.API_URL_TEST + environment.API_VERSION + this.param_url}/delete/${matricule}`, id);
  }

  // check the deleted false user roles 
  checkHasRoles(userRoles: any) {
    let hasRoles = false

    // See if there's some user role has a deleted false 
    for (let index = 0; index < userRoles.length; index++)
      if (!userRoles[index].deleted) hasRoles = true

    if (!hasRoles) return 'Pas de roles insérés'

    return null
  }

}

import { Injectable } from '@angular/core';
import { User } from '../../models/User'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  

  getUserInfo(): User {
    return JSON.parse(localStorage.getItem('user') || '').existedUser;
    
    // return localStorage.getItem('user')
  }
}
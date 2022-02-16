import { ActivatedRoute } from '@angular/router';
import { User } from './../../../models/User';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private userService: AdminService, private actRoute: ActivatedRoute) { }

  userMatricule: any = localStorage.getItem('matricule');

  user: User = {
    userMatricul: "",
    nom: "",
    prenom: "",
    code_dr: "",
    email: "",
    userRoles: [],
    deleted: false,
    password: ""
  };

  ngOnInit(): void {
    this.getUserById()
  }

  // Get the user data by id
  getUserById() {
    const id = this.actRoute.snapshot.paramMap.get('id') || '';
    this.userService.getUserById(id, this.userMatricule).subscribe((data: User) => {
      this.user = data;
    });
  }

  checkHasRoles(userRoles : any) {
    return this.userService.checkHasRoles(userRoles);
  }
}
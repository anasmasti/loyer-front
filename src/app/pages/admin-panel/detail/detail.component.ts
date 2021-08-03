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

  user: User = {
    userMatricul: "",
    nom: "",
    prenom: "",
    userRoles: []
  };

  ngOnInit(): void {
    this.getUserById()
  }

  // Get the user data by id
  getUserById() {
    const id = this.actRoute.snapshot.paramMap.get('id') || '';
    this.userService.getUserById(id).subscribe((data: User) => {
      this.user = data;
    });
  }
}

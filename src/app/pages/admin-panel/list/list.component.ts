import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin-service/admin.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users: any = [
    {
      "name": "chargement ...",
      "prenom": "chargement ...",
      "userMatricul": "chargement ...",
      "userRoles": [{
        "roleName": "chargement..."
      }]
    }
  ];
  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.adminService.getUserstList().subscribe((data) => {
      this.users = data;
    });
  }

}

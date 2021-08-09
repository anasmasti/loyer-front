import { HelperService } from './../../../services/helpers/helper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  user : string = 'Ajouter';

  constructor(private helperService: HelperService) { }

  ngOnInit(): void {
  }

  // Refrtech the page
  refrechPage() {
    this.helperService.refrechPage();
  }

}
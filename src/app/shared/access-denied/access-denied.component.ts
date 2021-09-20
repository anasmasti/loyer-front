import { MainModalService } from './../../services/main-modal/main-modal.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {

  role!: string

  constructor(
    private actRoute: ActivatedRoute,
    private mainModalService: MainModalService
  ) { }

  ngOnInit(): void {
    this.mainModalService.open();
    this.role = this.actRoute.snapshot.paramMap.get('role') || ''
  }

}

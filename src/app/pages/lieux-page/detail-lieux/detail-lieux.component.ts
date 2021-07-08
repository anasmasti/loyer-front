import { Component, OnInit } from '@angular/core';
import { ConfirmationModalService } from './../../../services/confirmation-modal.service';
import { MainModalService } from './../../../services/main-modal.service';
import { LieuxService } from 'src/app/services/lieux.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail-lieux',
  templateUrl: './detail-lieux.component.html',
  styleUrls: ['./detail-lieux.component.scss']
})
export class DetailLieuxComponent implements OnInit {
  Lieu:any=[];
  constructor(
    private lieuxService: LieuxService,
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getLieuById();
  }
// Get the proprietaire data by id
getLieuById() {
  const id = this.actRoute.snapshot.paramMap.get('id') || '';
  this.lieuxService.getLieuById(id).subscribe((data:any) => {
    this.Lieu = data;
  });
  console.log(id);
  console.log(this.Lieu);

}

}

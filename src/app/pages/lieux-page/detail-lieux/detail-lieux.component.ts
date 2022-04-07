import { environment } from './../../../../environments/environment';
import { Lieu } from 'src/app/models/Lieu';
import { Component, OnInit } from '@angular/core';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-lieux',
  templateUrl: './detail-lieux.component.html',
  styleUrls: ['./detail-lieux.component.scss'],
})
export class DetailLieuxComponent implements OnInit {
  lieu!: Lieu;
  userMatricule: any = localStorage.getItem('matricule');

  constructor(
    private lieuxService: LieuxService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getLieuById();
  }

  // Get the Lieu data by id
  getLieuById() {
    const id = this.actRoute.snapshot.paramMap.get('id') || '';
    this.lieuxService
      .getLieuById(id, this.userMatricule)
      .subscribe((data: Lieu) => {
        this.lieu = data;
        console.log(data);
        
      });
  }

  scroll() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }
}

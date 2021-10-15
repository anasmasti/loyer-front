import { ActivatedRoute } from '@angular/router';
import { FoncierService } from './../../../services/foncier-service/foncier.service';
import { Foncier } from './../../../models/Foncier';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foncier-detail',
  templateUrl: './foncier-detail.component.html',
  styleUrls: ['./foncier-detail.component.scss']
})
export class FoncierDetailComponent implements OnInit {

  foncier!: Foncier;
  userMatricule: any = localStorage.getItem('matricule')


  constructor(
    private foncierService: FoncierService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getFoncierById();
  }

  // Get the foncier data by id
  getFoncierById() {
    const id: string = this.actRoute.snapshot.paramMap.get('id') || '615c714d3500e8382c92fcda';
    this.foncierService.getFoncierById(id, this.userMatricule).subscribe((data: Foncier) => {
      this.foncier = data;
    });
  }

}

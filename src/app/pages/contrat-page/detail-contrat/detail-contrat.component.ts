import { Component, OnInit } from '@angular/core';
import { ContratService } from 'src/app/services/contrat-service/contrat.service';
import { Contrat } from '../../../models/Contrat';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-contrat',
  templateUrl: './detail-contrat.component.html',
  styleUrls: ['./detail-contrat.component.scss'],
})
export class DetailContratComponent implements OnInit {
   contrat!: Contrat;

  constructor(
    private contratService: ContratService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.getSelectedContrat();
  }

  // getSelectedContrat() {
  //   const id = this.actRoute.snapshot.paramMap.get('id') || '';
  //   this.contratService.getSelectedContrat(id).subscribe((data: any) => {
  //     this.Contrat = data;
  //   });
  // }
}

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

  foncier: Foncier = {
    proprietaire: 'Chargement...',
    type_foncier: 'Chargement...',
    adresse: 'Chargement...',
    description: 'Chargement...',
    lieu: 'Chargement...',
    assure: false,
    etat_du_bien: 'Chargement...',
    ville: 'Chargement...',
    code_postal: 'Chargement...',
    pays: 'Chargement...',
    montant_loyer: 0,
    meuble_equipe: false,
  };

  constructor(
    private foncierService: FoncierService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getFoncierById();
  }

  // Get the foncier data by id
  getFoncierById() {
    const id: string = this.actRoute.snapshot.paramMap.get('id') || '';
    this.foncierService.getFoncierById(id).subscribe((data: Foncier) => {
      this.foncier = data;
    });
  }

}

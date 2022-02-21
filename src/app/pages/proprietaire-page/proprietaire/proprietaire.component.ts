import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LieuxService } from '@services/lieux-service/lieux.service';
import { ProprietaireService } from 'src/app/services/proprietaire-service/proprietaire.service';

@Component({
  selector: 'app-proprietaire',
  templateUrl: './proprietaire.component.html',
  styleUrls: ['./proprietaire.component.scss'],
})
export class ProprietaireComponent implements OnInit {
  // proprietaireForm !: FormGroup;
  Checkproprietaire: any = '';
  foncier_id!: string;
  userMatricule: any = localStorage.getItem('matricule');
  contratByFoncier!: any[];
  constructor(
    private proprietaireService: ProprietaireService,
    private actRoute: ActivatedRoute,
    private lieuService: LieuxService,
  ) {}

  ngOnInit(): void {
    this.foncier_id = this.actRoute.snapshot.paramMap.get('id_foncier') || '';
  }

  getNumContratWithTypeLieu(){
    this.lieuService
      .getContratByFoncier(this.foncier_id, this.userMatricule)
      .subscribe((data) => {
        this.contratByFoncier = data
        console.log(this.contratByFoncier[0].numero_contrat);
        console.log(this.contratByFoncier[0].foncier.type_lieu);
      })
  }
}

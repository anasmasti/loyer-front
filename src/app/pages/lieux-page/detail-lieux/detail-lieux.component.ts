import { Component, OnInit } from '@angular/core';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { ActivatedRoute } from '@angular/router';
import { Lieu } from '../../../models/Lieu';

@Component({
  selector: 'app-detail-lieux',
  templateUrl: './detail-lieux.component.html',
  styleUrls: ['./detail-lieux.component.scss'],
})
export class DetailLieuxComponent implements OnInit {
  Lieu: Lieu = {
    deleted: false,
    _id: 'chargement ...',
    type_lieu: 'chargement ...',
    intitule_de_lieu: 'chargement ...',
    intitule_direction_regional: 'chargement ...',
    ville: 'chargement ...',
    raison_sociale: 'chargement ...',
    telephone: 0,
    fax: 0,
    code_localite: 'chargement ...',
    superficie: 'chargement ...',
    etage: 'chargement ...',
    code_Rattachement_DR: 'chargement ...',
    code_Rattachement_SUP: 'chargement ...',
    intitule_Rattachement_supervision_POS: 'chargement ...',
    centre_cout_Siege: 'chargement ...',
    categorie_point_Vente: 'chargement ...',
    has_amenagement: true,
    amenagement: [
      {
        proprietaire: {
          nature: 'chargement ...',
          valeur: 0,
        },
        fondation: {
          nature: 'chargement ...',
          valeur: 0,
        },
        deleted: false,
        _id: 'chargement ...',
        nature: 'chargement ...',
        montant: 0,
        n_Facture: 0,
        n_bon_Cde: 0,
        date_Passation_Cde: new Date(),
        evaluation_Fournisseur: 'chargement ...',
        date_Fin_travaux: new Date(),
        date_Livraison_local: new Date(),
        croquis: 'chargement ...',
      },
    ],
  };
  Amenagements: any = [];
  selectedAmenagement: any = {
    proprietaire: {
      nature: 'chargement ...',
      valeur: 0,
    },
    fondation: {
      nature: 'chargement ...',
      valeur: 0,
    },
    deleted: false,
    _id: 'chargement ...',
    nature: 'chargement ...',
    montant: 0,
    n_Facture: 0,
    n_bon_Cde: 0,
    date_Passation_Cde: new Date(),
    evaluation_Fournisseur: 'chargement ...',
    date_Fin_travaux: new Date(),
    date_Livraison_local: new Date(),
    croquis: 'chargement ...',
  };
  display = false;
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
    this.lieuxService.getLieuById(id).subscribe((data: any) => {
      this.Lieu = data[0];
      this.Amenagements = data[0].amenagement;
      console.log(data);
    });
  }

  scroll() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }

  displayAmenagement(id: any) {
    for (let index = 0; index < this.Lieu.amenagement.length; index++) {
      if (this.Lieu.amenagement[index]._id == id) {
        this.selectedAmenagement = this.Lieu.amenagement[index];
      }
    }
    console.log(this.selectedAmenagement._id);

    this.display = true;
  }
}

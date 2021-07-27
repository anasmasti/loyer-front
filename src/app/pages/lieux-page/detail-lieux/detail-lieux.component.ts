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
  lieu: Lieu = {
    code_lieu: 'loading..',
    intitule_lieu: 'loading..',
    intitule_DR: 'loading..',
    adresse: 'loading..',
    ville: 'loading..',
    code_localite: 'loading..',
    desc_lieu_entrer: 'loading..',
    imgs_lieu_entrer: 'loading..',
    has_amenagements: false,
    superficie: 'loading..',
    telephone: 0,
    fax: 0,
    etage: 'loading..',
    type_lieu: 'loading..',
    code_rattache_DR: 'loading..',
    code_rattache_SUP: 'loading..',
    intitule_rattache_SUP_PV: 'loading..',
    centre_cout_siege: 'loading..',
    categorie_pointVente: 'loading..',

    amenagement: [{
      _id: '',
      nature_amenagement: 'loading....',
      montant_amenagement: 'loading....',
      valeur_nature_chargeProprietaire: 'loading....',
      valeur_nature_chargeFondation: 'loading....',
      numero_facture: 'loading....',
      numero_bon_commande: 'loading....',
      date_passation_commande: 'loading....',
      evaluation_fournisseur: 'loading....',
      date_fin_travaux: 'loading....',
      date_livraison_local: 'loading....',
    }]
  };

  selectedAmenagement: any = {
    _id: '',
    nature_amenagement: 'loading....',
    montant_amenagement: 'loading....',
    valeur_nature_chargeProprietaire: 'loading....',
    valeur_nature_chargeFondation: 'loading....',
    numero_facture: 'loading....',
    numero_bon_commande: 'loading....',
    date_passation_commande: 'loading....',
    evaluation_fournisseur: 'loading....',
    date_fin_travaux: 'loading....',
    date_livraison_local: 'loading....'
  };
  display = false;
  constructor(
    private lieuxService: LieuxService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getLieuById();
  }
  // Get the Lieu data by id
  getLieuById() {
    const id = this.actRoute.snapshot.paramMap.get('id') || '';
    this.lieuxService.getLieuById(id).subscribe((data: any) => {
      this.lieu = data[0];
      this.lieu.amenagement = data[0];
      console.log(data);
    });
  }

  scroll() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }

  displayAmenagement(id: any) {
    // for (let index = 0; index < this.lieu.amenagement.length; index++) {
    //   if (this.lieu.amenagement[index]._id == id) {
    //     this.selectedAmenagement = this.lieu.amenagement[index];
    //   }
    // }

    this.display = true;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'sv-form',
  templateUrl: './sv-form.component.html',
  styleUrls: ['./sv-form.component.scss']
})
export class SvFormComponent implements OnInit {

  isAmenag : boolean = false;
  constructor() { }

  SvForm : FormGroup = new FormGroup({
    code_lieu: new FormControl(''),
    intitule_lieu: new FormControl(''),
    intitule_DR: new FormControl(''),
    adresse: new FormControl(''),
    ville: new FormControl(''),
    code_localite: new FormControl(''),
    desc_lieu_entrer: new FormControl(''),
    imgs_lieu_entrer: new FormControl(''),
    has_amenagements: new FormControl(''),
    amenagements: new FormControl(''),
    etat_logement_fonction: new FormControl(''),
    etage: new FormControl(''),
    type_lieu: new FormControl(''),
    code_rattache_DR: new FormControl(''),
    code_rattahce_SUP: new FormControl(''),
    intitule_rattache_SUP_PV: new FormControl(''),
    centre_cout_siege: new FormControl(''),
    categorie_pointVente: new FormControl(''),
      //Aménagement  
    nature_amenagement: new FormControl(''),
    montant_amenagement: new FormControl(''),
    valeur_nature_chargeProprietaire: new FormControl(''),
    valeur_nature_chargeFondation: new FormControl(''),
    numero_facture: new FormControl(''),
    numero_bon_commande: new FormControl(''),
    date_passation_commande: new FormControl(''),
    fournisseur: new FormControl(''),
    evaluation_fournisseur: new FormControl(''),
    date_fin_travaux: new FormControl(''),
    date_livraison_local: new FormControl(''),
    images_apres_travaux: new FormControl(''),
    images_croquis: new FormControl(''),
    superficie: new FormControl(''),
    telephone: new FormControl(''),
    fax: new FormControl(''),
    })

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'pv-form',
  templateUrl: './pv-form.component.html',
  styleUrls: ['./pv-form.component.scss']
})
export class PvFormComponent implements OnInit {

  isAmenag : boolean = false;
  constructor() { }

  PvForm : FormGroup = new FormGroup({
    code_PDV : new FormControl(),
    point_vente : new FormControl(),
    supervision : new FormControl(),
    code_SUP : new FormControl(),
    DR : new FormControl(),
    adressePV : new FormControl(),
    ville : new FormControl(), 
    catégoriePV : new FormControl(), 
    code_localité : new FormControl(),
    etage : new FormControl(),
    etat_lieux_entree : new FormControl(),
    descriptif_local : new FormControl(),
    images_avant_aménagement : new FormControl(),
    // amenagement : oui/non
    nature_travaux_amenagement : new FormControl(),
    montant_travaux_amenagement : new FormControl(),
    valeur_nature_travaux_charge_propriétaire : new FormControl(),
    valeur_nature_travaux_charge_fondation : new FormControl(),
    Nfacture : new FormControl(),
    Nbon_commande : new FormControl(),
    date_passation_commande : new FormControl(),
    fournisseur : new FormControl(),
    evaluation_fournisseur : new FormControl(),
    date_fin_travaux : new FormControl(),
    date_livraison_local : new FormControl(),
    images_local_après_amenagement : new FormControl(),
    croquis_amenagement_via_imagerie : new FormControl(),
    superficie : new FormControl(),
    telephone : new FormControl(),
    fax : new FormControl(),
    })

  ngOnInit(): void {
  }

}

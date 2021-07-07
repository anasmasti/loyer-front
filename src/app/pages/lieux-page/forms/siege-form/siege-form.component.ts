import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'siege-form',
  templateUrl: './siege-form.component.html',
  styleUrls: ['./siege-form.component.scss']
})
export class SiegeFormComponent implements OnInit {

  isAmenag : boolean = false;
  constructor() { }
  siegeForm : FormGroup = new FormGroup({
    code_immeuble : new FormControl(),
    centre_coût : new FormControl(),
    immeuble : new FormControl(),
    adresse_immeuble : new FormControl(),
    telephone_siege : new FormControl(),
    fax_siege : new FormControl(),
    superficie_par_etage : new FormControl(), 
    etat_lieux_entree : new FormControl(), 
    descriptif_local : new FormControl(),
    images_local_avant_amenagement : new FormControl(),
    
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

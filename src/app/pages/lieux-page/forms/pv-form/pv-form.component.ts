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
    code_lieu: new FormControl('',),
    intitule_lieu: new FormControl('',),
    intitule_DR: new FormControl('',),
    adresse: new FormControl('',),
    ville: new FormControl('',),
    code_localite: new FormControl('',),
    desc_lieu_entrer: new FormControl('',),
    imgs_lieu_entrer: new FormControl('',),
    has_amenagements: new FormControl('',),
    superficie: new FormControl('',),
    telephone: new FormControl('',),
    fax: new FormControl('',),
    etage: new FormControl('',),
    type_lieu: new FormControl('',),
    code_rattache_DR: new FormControl('',),
    code_rattahce_SUP: new FormControl('',),
    intitule_rattache_SUP_PV: new FormControl('',),
    centre_cout_siege: new FormControl('',),
    categorie_pointVente: new FormControl('',),
    deleted: new FormControl('',),
   
    nature_amenagement: new FormControl(''),
    montant_amenagement: new FormControl(''),
    valeur_nature_chargeProprietaire: new FormControl(''),
    valeur_nature_chargeFondation: new FormControl(''),
    numero_facture: new FormControl(''),
    numero_bon_commande: new FormControl(''),
    date_passation_commande: new FormControl(''),
    evaluation_fournisseur: new FormControl(''),
    date_fin_travaux: new FormControl(''),
    date_livraison_local: new FormControl(''),
    })

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'dr-form',
  templateUrl: './dr-form.component.html',
  styleUrls: ['./dr-form.component.scss']
})
export class DrFormComponent implements OnInit {

  isAmenag : boolean = false;
  // drForm !: FormGroup;
  constructor() { }

  drForm : FormGroup = new FormGroup({
  code_DR : new FormControl(),
  direction_R : new FormControl(),
	adresse_DR : new FormControl(),
	ville : new FormControl(),
	code_localite : new FormControl(),
	etage : new FormControl(),
  etat_lieux_entree : new FormControl(), 
	descriptif_local : new FormControl(), 
	images_local_avant_aménagement : new FormControl(),
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

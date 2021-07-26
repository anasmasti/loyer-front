import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'sv-form',
  templateUrl: './sv-form.component.html',
  styleUrls: ['./sv-form.component.scss']
})
export class SvFormComponent implements OnInit {

  constructor() { }

  hasAmenagement: boolean = false;
  SvForm!: FormGroup;

  ngOnInit(): void {
    this.SvForm = new FormGroup({
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
      amenagementForm: new FormArray([]),

    })
  }
  // Amenagement
  addAmenagement() {
    const amenagementData = new FormGroup({
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
      fournisseurForm: new FormArray([]),
      images_local_apres_amenagement: new FormControl(''),
      croquis_amenagement_via_imagerie: new FormControl(''),
    });

    (<FormArray>this.SvForm.get('amenagementForm')).push(<FormGroup>amenagementData)

  }

  removeAmenagement(index: number) {
    (<FormArray>this.SvForm.get('amenagementForm')).removeAt(index)
  }


  // FournisseurData
  addFournisseur(amenagementForm: any, index: number) {
    let fournisseurData = new FormGroup({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      amenagement_effectue: new FormControl(''),
    });

    (<FormArray>amenagementForm.controls[index].controls.fournisseurForm).push(<FormGroup>fournisseurData)
  }

  removeFournisseur(amenagementForm: any, index: number) {
    (<FormArray>amenagementForm.controls[index].controls.fournisseurForm).removeAt(index)
  }

  getFournisseur(amenagementForm: any, i: number) {
    return (amenagementForm.controls[i].controls.fournisseurForm).controls
  }

  get amenagementForm(): FormArray {
    return (<FormArray>this.SvForm.get('amenagementForm'));
  }
}

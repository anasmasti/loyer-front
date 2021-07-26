import { Lieu } from './../../../../models/lieu';

import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';

@Component({
  selector: 'dr-form',
  templateUrl: './dr-form.component.html',
  styleUrls: ['./dr-form.component.scss']
})
export class DrFormComponent implements OnInit {
  $testDrForm !: any;
  hasAmenagement: boolean = false;
  selectedFile !: File;
  drForm!: FormGroup;

  constructor(private drService: LieuxService) { }


  ngOnInit(): void {
    // console.log(this.drForm)
    this.drForm = new FormGroup({
      code_lieu: new FormControl('',),
      intitule_lieu: new FormControl('',),
      // intitule_DR: new FormControl('',),
      adresse: new FormControl('',),
      ville: new FormControl('',),
      code_localite: new FormControl('',),
      desc_lieu_entrer: new FormControl('',),
      // imgs_lieu_entrer: new FormControl('',),
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

      amenagementForm: new FormArray([]),

    });

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

    (<FormArray>this.drForm.get('amenagementForm')).push(<FormGroup>amenagementData)

  }

  removeAmenagement(index: number) {
    (<FormArray>this.drForm.get('amenagementForm')).removeAt(index)
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


  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  addDR() {
    // this.$testDrForm = this.drService.postDR(this.drForm)
    // this.$testDrForm.subscribe()
    // let formdata = new FormData();
    // formdata.append('imgs_lieu_entrer', this.selectedFile, this.selectedFile.name)
    // let myform = JSON.stringify(this.drForm.value)
    // let myform=JSON.parse(this.drForm.value)

    let data: Lieu = {
      code_lieu: this.drForm.get('code_lieu')?.value,
      intitule_lieu: this.drForm.get('intitule_lieu')?.value,
      adresse: this.drForm.get('adresse')?.value,
      ville: this.drForm.get('ville')?.value,
      code_localite: this.drForm.get('code_localite')?.value,
      desc_lieu_entrer: this.drForm.get('desc_lieu_entrer')?.value,
      amenagement: this.drForm.get('amenagementForm')?.value
    };

    // this.drService.addDR(data).subscribe()
    console.log(data);

  }



  get code_lieu() {
    return this.drForm.get('code_lieu');
  }

  get intitule_lieu() {
    return this.drForm.get('intitule_lieu');
  }

  get adresse() {
    return this.drForm.get('adresse');
  }

  get code_localite() {
    return this.drForm.get('code_localite');
  }

  get desc_lieu_entrer() {
    return this.drForm.get('desc_lieu_entrer');
  }

  get amenagementForm(): FormArray {
    return (<FormArray>this.drForm.get('amenagementForm'));
  }


}




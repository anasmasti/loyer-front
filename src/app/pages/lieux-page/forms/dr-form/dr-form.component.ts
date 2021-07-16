import { Lieu } from './../../../../models/Lieu';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';

@Component({
  selector: 'dr-form',
  templateUrl: './dr-form.component.html',
  styleUrls: ['./dr-form.component.scss']
})
export class DrFormComponent implements OnInit, OnDestroy {
  $testDrForm !: any;
  isAmenag: boolean = false;
  selectedFile !: File;
  // drForm !: FormGroup;
  constructor(private drService: LieuxService) { }

  drForm: FormGroup = new FormGroup({
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
    // console.log(this.drForm)
  }

  ngOnDestroy() {
    // this.$testDrForm.unsubscribe()
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);

  }

  addDR() {
    // this.$testDrForm = this.drService.postDR(this.drForm)
    // this.$testDrForm.subscribe()
    let formdata = new FormData();
    formdata.append('imgs_lieu_entrer', this.selectedFile, this.selectedFile.name)
    // let myform = JSON.stringify(this.drForm.value)
    // let myform=JSON.parse(this.drForm.value)

    let data: Lieu = {
      code_lieu: this.drForm.get('code_lieu')?.value,
      intitule_lieu: this.drForm.get('intitule_lieu')?.value,
      adresse: this.drForm.get('adresse')?.value,
      ville: this.drForm.get('ville')?.value,
      code_localite: this.drForm.get('code_localite')?.value,
      desc_lieu_entrer: this.drForm.get('desc_lieu_entrer')?.value,
    };

    this.drService.addDR(data).subscribe()
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

}




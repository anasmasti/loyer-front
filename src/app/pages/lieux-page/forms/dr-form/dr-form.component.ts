import { Lieu } from 'src/app/models/lieu';


import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';

@Component({
  selector: 'dr-form',
  templateUrl: './dr-form.component.html',
  styleUrls: ['./dr-form.component.scss']
})
export class DrFormComponent implements OnInit {
  $testDrForm!: any;
  errors!: string;
  hasAmenagement: boolean = false;
  postDone: boolean = false;
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
      imgs_lieu_entrer: new FormControl('',),
      has_amenagements: new FormControl('',),
      superficie: new FormControl('',),
      telephone: new FormControl('',),
      fax: new FormControl('',),
      etage: new FormControl('',),
      type_lieu: new FormControl('',),
      code_rattache_DR: new FormControl('',),
      code_rattache_SUP: new FormControl('',),
      intitule_rattache_SUP_PV: new FormControl('',),
      centre_cout_siege: new FormControl('',),
      categorie_pointVente: new FormControl('',),
      deleted: new FormControl('',),

      //Aménagement
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
      fournisseur: new FormArray([]),
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

    (<FormArray>amenagementForm.controls[index].controls.fournisseur).push(<FormGroup>fournisseurData)
  }

  removeFournisseur(amenagementForm: any, index: number) {
    (<FormArray>amenagementForm.controls[index].controls.fournisseur).removeAt(index)
  }

  getFournisseur(amenagementForm: any, i: number) {
    return (amenagementForm.controls[i].controls.fournisseur).controls
  }


  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];

    // if (event.target.files.length > 0) {
    //   this.selectedFile = <File>event.target.files[0];
    // }
  }

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  addDR() {
    // this.$testDrForm = this.drService.postDR(this.drForm)
    // this.$testDrForm.subscribe()
    let formdata = new FormData();
    formdata.append('imgs_lieu_entrer', this.selectedFile)
    //  let myform = JSON.stringify(this.drForm.value)
    //  let myform=JSON.parse(this.drForm.value)

    let dr_data: Lieu = {
      code_lieu: this.drForm.get('code_lieu')?.value,
      intitule_lieu: this.drForm.get('intitule_lieu')?.value,
      adresse: this.drForm.get('adresse')?.value,
      ville: this.drForm.get('ville')?.value,
      code_localite: this.drForm.get('code_localite')?.value,
      desc_lieu_entrer: this.drForm.get('desc_lieu_entrer')?.value,
      has_amenagements: this.drForm.get('has_amenagements')?.value,
      superficie: this.drForm.get('superficie')?.value,
      telephone: this.drForm.get('telephone')?.value,
      fax: this.drForm.get('fax')?.value,
      etage: this.drForm.get('etage')?.value,
      type_lieu: this.drForm.get('type_lieu')?.value,
      code_rattache_DR: this.drForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.drForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.drForm.get('code_lieu')?.value,
      centre_cout_siege: this.drForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.drForm.get('categorie_pointVente')?.value,

      // Amenagment
      amenagement: this.drForm.get('amenagementForm')?.value
    };
    
    this.drService.addLieu(dr_data).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.drForm.reset();
          this.postDone = false;
        }, 2000);
      },
      (error) => {
        this.errors = error.error.message;
        setTimeout(() => {
          this.showErrorMessage();
        }, 3000);
        this.hideErrorMessage();
      }
    )

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




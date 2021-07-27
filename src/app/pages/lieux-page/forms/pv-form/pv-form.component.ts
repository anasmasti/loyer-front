import { MainModalService } from './../../../../services/main-modal/main-modal.service';
import { ConfirmationModalService } from './../../../../services/confirmation-modal-service/confirmation-modal.service';
import { Lieu } from './../../../../models/Lieu';
import { LieuxService } from './../../../../services/lieux-service/lieux.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'pv-form',
  templateUrl: './pv-form.component.html',
  styleUrls: ['./pv-form.component.scss']
})
export class PvFormComponent implements OnInit {

  hasAmenagement: boolean = false;
  PvForm!: FormGroup;
  errors!: string;
  postDone: boolean = false;
  PostSucces: string = 'Propriétaire ajouté avec succés';

  constructor(
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private lieuService: LieuxService
  ) { }

  ngOnInit(): void {
    this.PvForm = new FormGroup({
      code_lieu: new FormControl(''),
      intitule_lieu: new FormControl(''),
      intitule_DR: new FormControl(''),
      adresse: new FormControl(''),
      ville: new FormControl(''),
      code_localite: new FormControl(''),
      desc_lieu_entrer: new FormControl(''),
      imgs_lieu_entrer: new FormControl(''),
      has_amenagements: new FormControl(''),
      etat_logement_fonction: new FormControl(''),
      etage: new FormControl(''),
      type_lieu: new FormControl(''),
      code_rattache_DR: new FormControl(''),
      code_rattache_SUP: new FormControl(''),
      intitule_rattache_SUP_PV: new FormControl(''),
      centre_cout_siege: new FormControl(''),
      categorie_pointVente: new FormControl(''),
      superficie: new FormControl('',),
      telephone: new FormControl('',),
      fax: new FormControl('',),

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
      fournisseur: new FormArray([]),
      images_local_apres_amenagement: new FormControl(''),
      croquis_amenagement_via_imagerie: new FormControl(''),
    });

    (<FormArray>this.PvForm.get('amenagementForm')).push(<FormGroup>amenagementData)

  }

  removeAmenagement(index: number) {
    (<FormArray>this.PvForm.get('amenagementForm')).removeAt(index)
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

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  addPv() {
    let pvData: Lieu = {
      code_lieu: this.PvForm.get('code_lieu')?.value,
      intitule_lieu: this.PvForm.get('intitule_lieu')?.value,
      intitule_DR: this.PvForm.get('intitule_DR')?.value,
      adresse: this.PvForm.get('adresse')?.value,
      ville: this.PvForm.get('ville')?.value,
      code_localite: this.PvForm.get('code_localite')?.value,
      desc_lieu_entrer: this.PvForm.get('desc_lieu_entrer')?.value,
      imgs_lieu_entrer: this.PvForm.get('imgs_lieu_entrer')?.value,
      has_amenagements: this.PvForm.get('has_amenagements')?.value,
      superficie: this.PvForm.get('superficie')?.value,
      telephone: this.PvForm.get('telephone')?.value,
      fax: this.PvForm.get('fax')?.value,
      etat_logement_fonction: this.PvForm.get('etat_logement_fonction')?.value,
      etage: this.PvForm.get('etage')?.value,
      type_lieu: this.PvForm.get('type_lieu')?.value,
      code_rattache_DR: this.PvForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.PvForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.PvForm.get('intitule_rattache_SUP_PV')?.value,
      centre_cout_siege: this.PvForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.PvForm.get('categorie_pointVente')?.value,

      // Amenagement
      amenagement: this.PvForm.get('amenagementForm')?.value,

    }

    this.lieuService.addLieu(pvData).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.PvForm.reset();
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


  removeFournisseur(amenagementForm: any, index: number) {
    (<FormArray>amenagementForm.controls[index].controls.fournisseur).removeAt(index)
  }

  getFournisseur(amenagementForm: any, i: number) {
    return (amenagementForm.controls[i].controls.fournisseur).controls
  }

  get amenagementForm(): FormArray {
    return (<FormArray>this.PvForm.get('amenagementForm'));
  }

}

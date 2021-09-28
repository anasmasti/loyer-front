import { AppState } from './../../../../store/app.state';
import { MainModalService } from './../../../../services/main-modal/main-modal.service';
import { ConfirmationModalService } from './../../../../services/confirmation-modal-service/confirmation-modal.service';
import { LieuxService } from './../../../../services/lieux-service/lieux.service';
import { Component, Inject, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray , Validators } from '@angular/forms';
import { getDrWithSupAction } from '../../lieux-store/lieux.actions';
import { getDr, getSup } from '../../lieux-store/lieux.selector';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { HelperService } from 'src/app/services/helpers/helper.service';

@Component({
  selector: 'pv-form',
  templateUrl: './pv-form.component.html',
  styleUrls: ['./pv-form.component.scss']
})
export class PvFormComponent implements OnInit, OnDestroy , OnChanges {

  hasAmenagement: boolean = false;
  PvForm!: FormGroup;
  errors!: string;
  postDone: boolean = false;
  PostSucces: string = 'Point de vente ajouté avec succés';
  updateDone: boolean = false;
  updateSucces: string = 'Point de vente modifié avec succés';
  amenagementList: any = [];
  Dr!: any;
  Sup!: any;
  DrSubscription$!: Subscription;
  SupSubscription$!: Subscription;
  hasAmenagementCheck: string = "";
  isAmenagementEmpty: boolean = true

  selectedFile!: File;
  file!: string;
  fd: FormData = new FormData();
  idm: any = JSON.stringify(Math.random());
  i: any = 0;
  imageExtension: string = '.pdf';
  selectedImagesLieuEntrer!: [];


  @Input() update!: boolean;
  @Input() Lieu!: any;
  @Input() LieuName!: string;

  constructor(
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private help: HelperService,
    private lieuService: LieuxService,
    private store: Store<AppState>,
    @Inject(DOCUMENT) private document: Document
  ) { }


  ngOnChanges() {
    if (this.Lieu !== "") {
      setTimeout(() => {
        this.fetchPv('Default');
      }, 100);
    }
  }

  ngOnInit(): void {
    this.PvForm = new FormGroup({
      code_lieu: new FormControl('' ,[Validators.required]),
      intitule_lieu: new FormControl('', [Validators.required]),
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
      code_rattache_DR: new FormControl('', [Validators.required]),
      code_rattache_SUP: new FormControl('', [Validators.required]),
      intitule_rattache_SUP_PV: new FormControl(''),
      centre_cout_siege: new FormControl(''),
      categorie_pointVente: new FormControl(''),
      superficie: new FormControl('',),
      telephone: new FormControl('',),
      fax: new FormControl('',),

      //Aménagement
      amenagementForm: new FormArray([]),
    })

    this.getDr()
    this.getSup()
  }


  fetchPv(HasAmenagement: string) {

    this.removeAllAmenagement();

    this.PvForm.patchValue({
      code_lieu: this.Lieu.code_lieu,
      intitule_lieu: this.Lieu.intitule_lieu,
      intitule_DR: this.Lieu.intitule_DR,
      adresse: this.Lieu.adresse,
      ville: this.Lieu.ville,
      code_localite: this.Lieu.code_localite,
      desc_lieu_entrer: this.Lieu.desc_lieu_entrer,
      // imgs_lieu_entrer: this.Lieu.imgs_lieu_entrer,
      has_amenagements: this.Lieu.has_amenagements,
      superficie: this.Lieu.superficie,
      telephone: this.Lieu.telephone,
      fax: this.Lieu.fax,
      etat_logement_fonction: this.Lieu.etat_logement_fonction,
      etage: this.Lieu.etage,
      type_lieu: this.Lieu.type_lieu,
      code_rattache_DR: this.Lieu.code_rattache_DR,
      code_rattache_SUP: this.Lieu.code_rattache_SUP,
      intitule_rattache_SUP_PV: this.Lieu.intitule_rattache_SUP_PV,
      centre_cout_siege: this.Lieu.centre_cout_siege,
      categorie_pointVente: this.Lieu.categorie_pointVente,
    });


    this.amenagementList = this.Lieu.amenagement;

    //amenagement inputs
    this.Lieu.amenagement.forEach((amenagementControl: any, index: any) => {


      let formGroupAmenagement = this.addAmenagement('OldAmng', amenagementControl.deleted);

      formGroupAmenagement.controls.idm.setValue(
        amenagementControl.idm
      );

      formGroupAmenagement.controls.images_apres_travaux.setValue(
        amenagementControl.images_apres_travaux
      );

      formGroupAmenagement.controls.croquis_travaux.setValue(
        amenagementControl.croquis_travaux
      );

      formGroupAmenagement.controls.nature_amenagement.setValue(
        amenagementControl.nature_amenagement
      );

      formGroupAmenagement.controls.montant_amenagement.setValue(
        amenagementControl.montant_amenagement
      );

      formGroupAmenagement.controls.valeur_nature_chargeProprietaire.setValue(
        amenagementControl.valeur_nature_chargeProprietaire
      );

      formGroupAmenagement.controls.valeur_nature_chargeFondation.setValue(
        amenagementControl.valeur_nature_chargeFondation
      );

      formGroupAmenagement.controls.numero_facture.setValue(
        amenagementControl.numero_facture
      );

      formGroupAmenagement.controls.numero_bon_commande.setValue(
        amenagementControl.numero_bon_commande
      );

      formGroupAmenagement.controls.date_passation_commande.setValue(
        amenagementControl.date_passation_commande
      );

      formGroupAmenagement.controls.evaluation_fournisseur.setValue(
        amenagementControl.evaluation_fournisseur
      );

      formGroupAmenagement.controls.date_fin_travaux.setValue(
        amenagementControl.date_fin_travaux
      );

      formGroupAmenagement.controls.date_livraison_local.setValue(
        amenagementControl.date_livraison_local
      );

      formGroupAmenagement.controls.deleted.setValue(
        amenagementControl.deleted
      );


      if (amenagementControl.fournisseur.length !== 0) {
        for (let FourniseurControl of amenagementControl.fournisseur) {
          let formGroupFournisseur = new FormGroup({
            nom: new FormControl(''),
            prenom: new FormControl(''),
            amenagement_effectue: new FormControl(''),
            deleted: new FormControl('Test'),
            NewOrOld: new FormControl('old',),
          });

          (<FormArray>formGroupAmenagement.controls.fournisseur).push(<FormGroup>formGroupFournisseur)

          formGroupFournisseur.controls.nom.setValue(
            FourniseurControl.nom
          );

          formGroupFournisseur.controls.prenom.setValue(
            FourniseurControl.prenom
          );

          formGroupFournisseur.controls.amenagement_effectue.setValue(
            FourniseurControl.amenagement_effectue
          );

          formGroupFournisseur.controls.deleted.setValue(
            FourniseurControl.deleted
          );
        }
      }

      if (!amenagementControl.deleted) {
        this.hasAmenagement = true
      }
    });

    if (HasAmenagement == "Oui") {
      this.hasAmenagement = true;
      this.hasAmenagementCheck = ""
      this.PvForm.patchValue({
        has_amenagements: this.hasAmenagement
      })
    }
    else {
      if (HasAmenagement != "Default") {
        this.hasAmenagement = false;
        this.hasAmenagementCheck = "ButtonNon"
        this.PvForm.patchValue({
          has_amenagements: this.hasAmenagement
        })
      }
    }
  }


  // Amenagement
  addAmenagement(NewOrOld: string, deleted: boolean) {
    const amenagementData = new FormGroup({
      idm: new FormControl(''),
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
      images_apres_travaux_files: new FormControl(''),
      images_apres_travaux: new FormControl(''),
      croquis_travaux_files: new FormControl(''),
      croquis_travaux: new FormControl(''),
      deleted: new FormControl(deleted),
      NewOrOld: new FormControl(NewOrOld),
    });

    (<FormArray>this.PvForm.get('amenagementForm')).push(<FormGroup>amenagementData)

    return (<FormGroup>amenagementData)

  }


  removeAmenagement(index: number) {
    // (<FormArray>this.PvForm.get('amenagementForm')).removeAt(index)
    let Amenagement = <FormArray>this.PvForm.get('amenagementForm');

    if (Amenagement.value[index].NewOrOld == "NewAmng") {
      (<FormArray>this.PvForm.get('amenagementForm')).removeAt(index)
    }
    else {
      let element = this.document.getElementById('deleted ' + index) as HTMLInputElement
      element.value = "True"
      this.document.getElementById(index.toString())?.classList.add('d-none');
      Amenagement.value[index].deleted = true;
      // Amenagement.controls[index].value.deleted = "true"
    }
  }


  removeAllAmenagement() {
    (<FormArray>this.PvForm.get('amenagementForm')).clear();
  }


  // FournisseurData
  addFournisseur(amenagementForm: any, index: number, NewOrOld: string) {
    let fournisseurData = new FormGroup({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      amenagement_effectue: new FormControl(''),
      deleted: new FormControl(''),
      NewOrOld: new FormControl(NewOrOld,),
    });

    (<FormArray>amenagementForm.controls[index].controls.fournisseur).push(<FormGroup>fournisseurData)
  }

  removeFournisseur(amenagementForm: any, indexAmng: number, indexFourn: number) {

    let fournisseur = <FormArray>amenagementForm.controls[indexAmng].controls.fournisseur;
    if (fournisseur.value[indexFourn].NewOrOld == 'New') {
      (<FormArray>amenagementForm.controls[indexAmng].controls.fournisseur).removeAt(indexFourn)
    }
    else {
      let element = this.document.getElementById('deleted ' + indexAmng + ' ' + indexFourn.toString()) as HTMLInputElement
      element.value = "True"
      fournisseur.value[indexFourn].deleted = "true";
    }
  }

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  hasAmengmnt(HasAmng: string) {
    if (HasAmng == 'Oui') {
      this.hasAmenagement = true;
      this.hasAmenagementCheck = ''
    }
    else {
      this.hasAmenagement = false;
      this.hasAmenagementCheck = 'ButtonNon'
    }
  }

  //Upload Image amenagement après amenagement
  onFileSelectedAmenagement(event: any, index: number) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      if (!this.update) {
        this.file = this.idm + index + this.imageExtension;
        this.fd.append('imgs_croquis', this.selectedFile, this.file);
      }
      if (this.update && this.Lieu.amenagement[index]?.idm === undefined) {
        this.file = this.idm + index + this.imageExtension;
        this.fd.append('imgs_croquis', this.selectedFile, this.file);
      }
      if (this.update && this.Lieu.amenagement[index]?.idm !== undefined) {
        this.file = this.Lieu.amenagement[index]?.idm + this.imageExtension;
        this.fd.append('imgs_croquis', this.selectedFile, this.file);
      }
    }
  }

  //Upload Croquis
  onFileSelectedCroquis(event: any, index: number) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      if (!this.update) {
        this.file = this.idm + index + this.imageExtension;
        this.fd.append('imgs_croquis', this.selectedFile, this.file);
      }
      if (this.update && this.Lieu.amenagement[index]?.idm === undefined) {
        this.file = this.idm + index + this.imageExtension;
        this.fd.append('imgs_croquis', this.selectedFile, this.file);
      }
      if (this.update && this.Lieu.amenagement[index]?.idm !== undefined) {
        this.file = this.Lieu.amenagement[index]?.idm + this.imageExtension;
        this.fd.append('imgs_croquis', this.selectedFile, this.file);
      }
    }
  }

  //Upload Image amenagement avant amenagement
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.fd.append('imgs_lieu_entrer', this.selectedFile);
    }
  }

  // Check if all inputs has invalid errors
  checkInputsValidation(targetInput: any) {
    return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
  }

  addPv() {
    let pvData: any = {
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
      type_lieu: this.LieuName,
      code_rattache_DR: this.PvForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.PvForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.PvForm.get('intitule_rattache_SUP_PV')?.value,
      centre_cout_siege: this.PvForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.PvForm.get('categorie_pointVente')?.value,

      // Amenagement
      amenagement: this.PvForm.get('amenagementForm')?.value,

    }

   

    this.fd.append('data', JSON.stringify(pvData));

    this.lieuService.addLieu(this.fd).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.PvForm.reset();
          this.postDone = false;
          // this.help.refrechPage();
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

  updatePv() {

    let id = this.Lieu._id;

    this.isAmenagementEmpty = false;

    if (this.hasAmenagementCheck == "ButtonNon") {
      this.isAmenagementEmpty = false;
    }
    else {
      this.PvForm.get('amenagementForm')?.value.forEach((element: any) => {
        if (!element.deleted) {
          this.isAmenagementEmpty = true;
        }
      });
    }

    this.selectedImagesLieuEntrer = this.Lieu.imgs_lieu_entrer;

    let pvData: any = {
      code_lieu: this.PvForm.get('code_lieu')?.value,
      intitule_lieu: this.PvForm.get('intitule_lieu')?.value,
      intitule_DR: this.PvForm.get('intitule_DR')?.value,
      adresse: this.PvForm.get('adresse')?.value,
      ville: this.PvForm.get('ville')?.value,
      code_localite: this.PvForm.get('code_localite')?.value,
      desc_lieu_entrer: this.PvForm.get('desc_lieu_entrer')?.value,
      imgs_lieu_entrer: this.selectedImagesLieuEntrer,
      has_amenagements: this.isAmenagementEmpty,
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

    this.fd.append('data', JSON.stringify(pvData));

    this.lieuService.updateLieux(id, this.fd).subscribe(
      (_) => {
        this.updateDone = true;
        setTimeout(() => {
          this.mainModalService.close();
          this.PvForm.reset();
          this.updateDone = false;
          location.reload();
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

  // Get Dr and Sup from the server
  getDrSup() {
    this.store.dispatch(getDrWithSupAction())
  }
  // Select Dr
  getDr() {
    this.DrSubscription$ = this.store.select(getDr).subscribe(data => {
      if (data) this.Dr = data;
      if (!data) this.getDrSup()
    })
  }
  // Select Sup
  getSup() {
    this.SupSubscription$ = this.store.select(getSup).subscribe(data => {
      if (data) this.Sup = data;
      if (!data) this.getDrSup()
    })
  }

  getFournisseur(amenagementForm: any, i: number) {
    return (amenagementForm.controls[i].controls.fournisseur).controls
  }

  ngOnDestroy() {
    if (this.DrSubscription$) this.DrSubscription$.unsubscribe()
    if (this.SupSubscription$) this.SupSubscription$.unsubscribe()
  }


  get amenagementForm(): FormArray {
    return (<FormArray>this.PvForm.get('amenagementForm'));
  }

  get code_lieu() {
    return this.PvForm.get('code_lieu')
  }

  get intitule_lieu() {
    return this.PvForm.get('intitule_lieu')
  }

  get code_rattache_DR() {
    return this.PvForm.get('code_rattache_DR')
  }

  get code_rattache_SUP() {
    return this.PvForm.get('code_rattache_SUP')
  }

}

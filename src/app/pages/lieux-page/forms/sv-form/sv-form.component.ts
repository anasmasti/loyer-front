import { AppState } from './../../../../store/app.state';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray ,Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { getDrWithSupAction } from '../../lieux-store/lieux.actions';
import { getDr } from '../../lieux-store/lieux.selector';
import { DOCUMENT } from '@angular/common';
import { HelperService } from 'src/app/services/helpers/helper.service';

@Component({
  selector: 'sv-form',
  templateUrl: './sv-form.component.html',
  styleUrls: ['./sv-form.component.scss'],
})
export class SvFormComponent implements OnInit, OnDestroy {
  hasAmenagement: boolean = false;
  svForm!: FormGroup;
  errors!: any;
  postDone: boolean = false;
  PostSucces: string = 'Supervision ajouté avec succés';
  updateDone: boolean = false;
  updateSucces: string = 'Supervision modifié avec succés';
  Dr!: any;
  DrSubscription$!: Subscription;
  isAmenagementEmpty: boolean = true;
  hasAmenagementCheck: string = '';
  amenagementList: any = [];

  selectedFile!: File;
  file!: string;
  fd: FormData = new FormData();
  idm: any = JSON.stringify(Math.random());
  imageExtension: string = '.pdf';
  selectedImagesLieuEntrer!: [];

  @Input() update!: boolean;
  @Input() Lieu!: any;
  @Input() LieuName!: string;

  userMatricule: any = localStorage.getItem('matricule')


  constructor(
    private svService: LieuxService,
    private lieuService: LieuxService,
    private mainModalService: MainModalService,
    private help: HelperService,
    private store: Store<AppState>,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnChanges() {
    if (this.Lieu !== '') {
      setTimeout(() => {
        this.fetchSv('Default');
      }, 100);
    }
  }

  ngOnInit(): void {
    this.svForm = new FormGroup({
      code_lieu: new FormControl('' ,[Validators.required,Validators.maxLength(3),Validators.pattern('[0-9]*')]),
      intitule_lieu: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
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
      code_rattache_SUP: new FormControl(''),
      intitule_rattache_SUP_PV: new FormControl(''),
      centre_cout_siege: new FormControl(''),
      categorie_pointVente: new FormControl(''),
      telephone: new FormControl(''),
      fax: new FormControl('',[Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(10)]),
      superficie: new FormControl('',[Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(10)]),

      //Aménagement
      amenagementForm: new FormArray([]),
    });

    this.getDr();
  }

  fetchSv(HasAmenagement: string) {
    this.removeAllAmenagement();

    this.svForm.patchValue({
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
      let formGroupAmenagement = this.addAmenagement(
        'OldAmng',
        amenagementControl.deleted
      );

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

      formGroupAmenagement.controls.deleted.setValue(amenagementControl.deleted);

      if (amenagementControl.fournisseur.length !== 0) {
        for (let FourniseurControl of amenagementControl.fournisseur) {
          let formGroupFournisseur = new FormGroup({
            nom: new FormControl(''),
            prenom: new FormControl(''),
            amenagement_effectue: new FormControl(''),
            deleted: new FormControl('Test'),
            NewOrOld: new FormControl('old'),
          });

          (<FormArray>formGroupAmenagement.controls.fournisseur).push(
            <FormGroup>formGroupFournisseur
          );

          formGroupFournisseur.controls.nom.setValue(FourniseurControl.nom);

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
        this.hasAmenagement = true;
      }
    });

    if (HasAmenagement == 'Oui') {
      this.hasAmenagement = true;
      this.hasAmenagementCheck = '';
      this.svForm.patchValue({
        has_amenagements: this.hasAmenagement,
      });
    } else {
      if (HasAmenagement != 'Default') {
        this.hasAmenagement = false;
        this.hasAmenagementCheck = 'ButtonNon';
        this.svForm.patchValue({
          has_amenagements: this.hasAmenagement,
        });
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

    (<FormArray>this.svForm.get('amenagementForm')).push(
      <FormGroup>amenagementData
    );

    return <FormGroup>amenagementData;
  }

  removeAmenagement(index: number) {
    // (<FormArray>this.svForm.get('amenagementForm')).removeAt(index)

    let Amenagement = <FormArray>this.svForm.get('amenagementForm');

    if (Amenagement.value[index].NewOrOld == 'NewAmng') {
      (<FormArray>this.svForm.get('amenagementForm')).removeAt(index);
    } else {
      let element = this.document.getElementById(
        'deleted ' + index
      ) as HTMLInputElement;

      element.value = 'True';
      this.document.getElementById(index.toString())?.classList.add('d-none');
      Amenagement.value[index].deleted = true;
    }
  }

  removeAllAmenagement() {
    (<FormArray>this.svForm.get('amenagementForm')).clear();
  }

  // FournisseurData
  addFournisseur(amenagementForm: any, index: number, NewOrOld: string) {
    let fournisseurData = new FormGroup({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      amenagement_effectue: new FormControl(''),
      deleted: new FormControl(''),
      NewOrOld: new FormControl(NewOrOld),
    });

    (<FormArray>amenagementForm.controls[index].controls.fournisseur).push(
      <FormGroup>fournisseurData
    );

    return <FormGroup>fournisseurData;
  }

  removeFournisseur(
    amenagementForm: any,
    indexAmng: number,
    indexFourn: number
  ) {
    let fournisseur = <FormArray>(
      amenagementForm.controls[indexAmng].controls.fournisseur
    );

    if (fournisseur.value[indexFourn].NewOrOld == 'New') {
      (<FormArray>(
        amenagementForm.controls[indexAmng].controls.fournisseur
      )).removeAt(indexFourn);
    } else {
      let element = this.document.getElementById(
        'deleted ' + indexAmng + ' ' + indexFourn.toString()
      ) as HTMLInputElement;
      element.value = 'True';
      fournisseur.value[indexFourn].deleted = 'true';
    }
  }

  getFournisseur(amenagementForm: any, i: number) {
    return amenagementForm.controls[i].controls.fournisseur.controls;
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
      this.hasAmenagementCheck = '';
    } else {
      this.hasAmenagement = false;
      this.hasAmenagementCheck = 'ButtonNon';
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

    // Check if all inputs has invalid errors
    checkInputsValidation(targetInput: any) {
      return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
    }

  //Upload Image amenagement avant amenagement
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.fd.append('imgs_lieu_entrer', this.selectedFile);
    }
  }

  onAddSv() {
    let svData: any = {
      code_lieu: this.svForm.get('code_lieu')?.value,
      intitule_lieu: this.svForm.get('intitule_lieu')?.value,
      intitule_DR: this.svForm.get('intitule_DR')?.value,
      adresse: this.svForm.get('adresse')?.value,
      ville: this.svForm.get('ville')?.value,
      code_localite: this.svForm.get('code_localite')?.value,
      desc_lieu_entrer: this.svForm.get('desc_lieu_entrer')?.value,
      // imgs_lieu_entrer: this.svForm.get('imgs_lieu_entrer')?.value,
      has_amenagements: this.svForm.get('has_amenagements')?.value,
      superficie: this.svForm.get('superficie')?.value,
      telephone: this.svForm.get('telephone')?.value,
      fax: this.svForm.get('fax')?.value,
      etat_logement_fonction: this.svForm.get('etat_logement_fonction')?.value,
      etage: this.svForm.get('etage')?.value,
      type_lieu: this.LieuName,
      code_rattache_DR: this.svForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.svForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.svForm.get('intitule_rattache_SUP_PV')
        ?.value,
      centre_cout_siege: this.svForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.svForm.get('categorie_pointVente')?.value,

      //Aménagement
      amenagement: this.svForm.get('amenagementForm')?.value,
    };

    this.fd.append('data', JSON.stringify(svData));

    this.svService.addLieu(this.fd, this.userMatricule).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.svForm.reset();
          this.postDone = false;
          this.help.refrechPage();
        }, 2000);
      },
      (error) => {
        this.errors = error.error.message;
        setTimeout(() => {
          this.showErrorMessage();
        }, 3000);
        this.hideErrorMessage();
      }
    );
  }

  updateSv() {
    let id = this.Lieu._id;

    this.isAmenagementEmpty = false;

    if (this.hasAmenagementCheck == 'ButtonNon') {
      this.isAmenagementEmpty = false;
    } else {
      this.svForm.get('amenagementForm')?.value.forEach((element: any) => {
        if (!element.deleted) {
          this.isAmenagementEmpty = true;
        }
      });
    }

    this.selectedImagesLieuEntrer = this.Lieu.imgs_lieu_entrer;

    let SvData: any = {
      code_lieu: this.svForm.get('code_lieu')?.value,
      intitule_lieu: this.svForm.get('intitule_lieu')?.value,
      intitule_DR: this.svForm.get('intitule_DR')?.value,
      adresse: this.svForm.get('adresse')?.value,
      ville: this.svForm.get('ville')?.value,
      code_localite: this.svForm.get('code_localite')?.value,
      desc_lieu_entrer: this.svForm.get('desc_lieu_entrer')?.value,
      imgs_lieu_entrer: this.selectedImagesLieuEntrer,
      has_amenagements: this.isAmenagementEmpty,
      superficie: this.svForm.get('superficie')?.value,
      telephone: this.svForm.get('telephone')?.value,
      fax: this.svForm.get('fax')?.value,
      etat_logement_fonction: this.svForm.get('etat_logement_fonction')?.value,
      etage: this.svForm.get('etage')?.value,
      type_lieu: this.svForm.get('type_lieu')?.value,
      code_rattache_DR: this.svForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.svForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.svForm.get('intitule_rattache_SUP_PV')
        ?.value,
      centre_cout_siege: this.svForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.svForm.get('categorie_pointVente')?.value,

      // Amenagement
      amenagement: this.svForm.get('amenagementForm')?.value,
    };

    this.fd.append('data', JSON.stringify(SvData))

    this.lieuService.updateLieux(id, this.fd, this.userMatricule).subscribe(
      (_) => {
        this.updateDone = true;
        setTimeout(() => {
          this.mainModalService.close();
          this.svForm.reset();
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
    );
  }

  // Get Dr and Sup from the server
  getDrSup() {
    this.store.dispatch(getDrWithSupAction());
  }
  // Select Dr
  getDr() {
    this.DrSubscription$ = this.store.select(getDr).subscribe(data => {
      if (data) this.Dr = data;
      if (!data) this.getDrSup()
    })
  }

  ngOnDestroy() {
    if (this.DrSubscription$) this.DrSubscription$.unsubscribe();
  }

  get code_lieu() {
    return this.svForm.get('code_lieu');
  }

  get intitule_lieu() {
    return this.svForm.get('intitule_lieu');
  }

  get intitule_DR() {
    return this.svForm.get('intitule_DR');
  }

  get adresse() {
    return this.svForm.get('adresse');
  }

  get ville() {
    return this.svForm.get('ville');
  }

  get code_localite() {
    return this.svForm.get('code_localite');
  }

  get desc_lieu_entrer() {
    return this.svForm.get('desc_lieu_entrer');
  }

  get imgs_lieu_entrer() {
    return this.svForm.get('imgs_lieu_entrer');
  }

  get has_amenagements() {
    return this.svForm.get('has_amenagements');
  }

  get amenagements() {
    return this.svForm.get('amenagements');
  }

  get etat_logement_fonction() {
    return this.svForm.get('etat_logement_fonction');
  }

  get etage() {
    return this.svForm.get('etage');
  }

  get telephone() {
    return this.svForm.get('telephone');
  }

  get fax() {
    return this.svForm.get('fax');
  }

  get superficie() {
    return this.svForm.get('superficie');
  }

  get type_lieu() {
    return this.svForm.get('type_lieu');
  }

  get code_rattache_DR() {
    return this.svForm.get('code_rattache_DR');
  }

  get code_rattache_SUP() {
    return this.svForm.get('code_rattache_SUP');
  }

  get intitule_rattache_SUP_PV() {
    return this.svForm.get('intitule_rattache_SUP_PV');
  }

  get centre_cout_siege() {
    return this.svForm.get('centre_cout_siege');
  }

  get categorie_pointVente() {
    return this.svForm.get('categorie_pointVente');
  }

  get amenagementForm(): FormArray {
    return <FormArray>this.svForm.get('amenagementForm');
  }
}

import { Foncier } from './../../../models/Foncier';
import { FoncierService } from './../../../services/foncier-service/foncier.service';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy, Inject } from '@angular/core';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { getCitiesAction } from 'src/app/store/shared/shared.action';
import { DOCUMENT } from '@angular/common';
import { getCities } from 'src/app/store/shared/shared.selector';
import {
  getLieux,
  getLieuxByType,
} from '../../lieux-page/lieux-store/lieux.selector';
import { Lieu } from 'src/app/models/Lieu';
import { getLieuxAction } from '../../lieux-page/lieux-store/lieux.actions';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal-service/confirmation-modal.service';

@Component({
  selector: 'foncier-form',
  templateUrl: './foncier-form.component.html',
  styleUrls: ['./foncier-form.component.scss'],
})
export class FoncierFormComponent implements OnInit, OnDestroy {
  @Input() formType!: string;
  @Input() foncier!: any;
  @Input() update!: boolean;

  hasAmenagement: boolean = false;
  hasAmenagementCheck: string = '';
  file!: string;
  fd: FormData = new FormData();
  idm: any = JSON.stringify(Math.random());
  isAmenagementEmpty: boolean = true;
  imageExtension: string = '.pdf';
  selectedImagesLieuEntrer!: [];
  amenagementList: any = [];
  userMatricule: any = localStorage.getItem('matricule');
  cities!: any[];
  citiesSubscription$!: Subscription;
  selectedFile!: File;

  errors!: string;
  postDone: boolean = false;
  PostSucces: string = 'Local ajouté avec succés';
  updateDone: boolean = false;
  updateSucces: string = 'Local modifié avec succés';
  foncierForm!: FormGroup;
  // lieuForm!: FormGroup;

  proprietaires!: any;
  lieux!: any;
  lieuxSubscription$!: Subscription;
  currentLieu: any = null;
  foncierLieux: any[] = [];
  proprietairesSubscription$!: Subscription;
  isFournisseurExist: boolean = false;

  types = [
    {
      id: 'DR',
      name: 'Direction régionale',
    },
    {
      id: 'LF',
      name: 'Logement de fonction',
    },
    {
      id: 'PV',
      name: 'Point de vente',
    },
    {
      id: 'Siege',
      name: 'Siège',
    },
    {
      id: 'SV',
      name: 'Supervision',
    },
  ];

  //Les natures des travaux d'aménagement
  natures = [
    {
      id: 1,
      name: 'construction',
    },
    {
      id: 2,
      name: 'démolition',
    },
    {
      id: 3,
      name: 'plomberie',
    },
    {
      id: 4,
      name: 'peinture',
    },
    {
      id: 5,
      name: 'menuiserie',
    },
    {
      id: 6,
      name: 'électricité',
    },
  ];

  lieuxByType!: Lieu[];
  selectedType!: string;
  selectedLieuId!: string;
  Intituler_lieu: string = '';
  ActiveForm!: any;
  CodeLieu!: any;

  // modals id
  TransfereModalId: any = 'TransfererModalId';
  ATransfereModalId: any = 'ATransfererModalId';
  AnnulerTransfereModalId: any = 'AnnulerTransféreModalId';

  constructor(
    private foncierService: FoncierService,
    private store: Store<AppState>,
    private help: HelperService,
    private mainModalService: MainModalService,
    private ConfirmationModalService: ConfirmationModalService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.foncierForm = new FormGroup({
      type_lieu: new FormControl('', [Validators.required]),
      adresse: new FormControl('', [Validators.required]),
      lieu: new FormControl('', [Validators.required]),
      ville: new FormControl('', [Validators.required]),
      desc_lieu_entrer: new FormControl(''),
      has_contrat: new FormControl(''),
      has_amenagements: new FormControl(''),
      superficie: new FormControl(''),
      etage: new FormControl(''),
      imgs_lieu_entrer: new FormControl(''),
      // Amenagement
      amenagementForm: new FormArray([]),
    });

    this.getCities();

    // Throw get lieux from server function
    this.getAllLieux();
  }

  fetchCities() {
    this.store.dispatch(getCitiesAction());
  }

  fetchLieux() {
    this.store.dispatch(getLieuxAction());
  }

  getCities() {
    this.citiesSubscription$ = this.store
      .select(getCities)
      .subscribe((data) => {
        if (data) this.cities = data;
        if (data.length == 0) this.fetchCities();
      });
  }

  // Get all lieux
  getAllLieux() {
    // Select lieux from store
    this.lieuxSubscription$ = this.store.select(getLieux).subscribe((data) => {
      // Check if lieux data is empty then fetch it from server
      if (data) this.lieux = data;
      // Dispatch action to handle the NgRx get lieux from server effect
      if (data.length == 0) this.fetchLieux();
    });
  }

  getLieuxByType(type: string) {
    this.store.select(getLieuxByType, { type_lieu: type }).subscribe((data) => {
      if (data) this.lieuxByType = data;
    });
    this.Intituler_lieu = '';
  }

  ngOnChanges() {
    if (this.foncier !== '' && this.foncier !== undefined) {
      setTimeout(() => {
        this.fetchFc('Default');
      }, 200);
    }
  }

  fetchFc(HasAmenagement: string) {
    this.removeAllAmenagement();

    // reintialise variables
    this.currentLieu = null;
    this.foncierLieux = [];
    this.selectedLieuId = '';
    this.selectedType = '';
    this.Intituler_lieu = '';

    this.foncierForm.patchValue({
      type_lieu: this.foncier.type_lieu,
      adresse: this.foncier.adresse,
      lieu: this.foncier.lieu,
      ville: this.foncier.ville,
      desc_lieu_entrer: this.foncier.desc_lieu_entrer,
      has_contrat: this.foncier.has_contrat,
      has_amenagements: this.foncier.has_amenagements,
      superficie: this.foncier.superficie,
      etage: this.foncier.etage,
    });

    // Fetch lieu
    this.foncier.lieu.forEach((element: any) => {
      if (!element.deleted) this.fillCurrentLieuObject(element);
      else this.pushIntoFoncierLieux(element);
    });

    this.amenagementList = this.foncier.amenagement;

    //Amenagement inputs
    this.foncier.amenagement.forEach((amenagementControl: any) => {
      let formGroupAmenagement = this.addAmenagement(
        'OldAmng',
        amenagementControl.deleted
      );

      formGroupAmenagement.controls.idm.setValue(amenagementControl.idm);

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
            deleted: new FormControl(''),
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
          if (!FourniseurControl.deleted) {
            this.isFournisseurExist = true;
          }
        }
      }

      if (!amenagementControl.deleted) {
        this.hasAmenagement = true;
      }
    });

    if (HasAmenagement == 'Oui') {
      this.hasAmenagement = true;
      this.hasAmenagementCheck = '';
      this.foncierForm.patchValue({
        has_amenagements: this.hasAmenagement,
      });
    } else {
      if (HasAmenagement != 'Default') {
        this.hasAmenagement = false;
        this.hasAmenagementCheck = 'ButtonNon';
        this.foncierForm.patchValue({
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

    (<FormArray>this.foncierForm.get('amenagementForm')).push(
      <FormGroup>amenagementData
    );

    return <FormGroup>amenagementData;
  }

  removeAmenagement(index: number) {
    // (<FormArray>this.foncierForm.get('amenagementForm')).removeAt(index)

    let Amenagement = <FormArray>this.foncierForm.get('amenagementForm');

    if (Amenagement.value[index].NewOrOld == 'NewAmng') {
      (<FormArray>this.foncierForm.get('amenagementForm')).removeAt(index);
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
    (<FormArray>this.foncierForm.get('amenagementForm')).clear();
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
        this.fd.append('imgs_amenagement', this.selectedFile, this.file);
      }
      if (this.update && this.foncier.amenagement[index]?.idm === undefined) {
        this.file = this.idm + index + this.imageExtension;
        this.fd.append('imgs_amenagement', this.selectedFile, this.file);
      }
      if (this.update && this.foncier.amenagement[index]?.idm !== undefined) {
        this.file = this.foncier.amenagement[index]?.idm + this.imageExtension;
        this.fd.append('imgs_amenagement', this.selectedFile, this.file);
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
      if (this.update && this.foncier.amenagement[index]?.idm === undefined) {
        this.file = this.idm + index + this.imageExtension;
        this.fd.append('imgs_croquis', this.selectedFile, this.file);
      }
      if (this.update && this.foncier.amenagement[index]?.idm !== undefined) {
        this.file = this.foncier.amenagement[index]?.idm + this.imageExtension;
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

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }
  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  // Check if all inputs has invalid errors
  checkInputsValidation(targetInput: any) {
    return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
  }

  addFoncier() {
    let foncier: Foncier = {
      proprietaire: this.foncierForm.get('proprietaire')?.value,
      type_lieu: this.foncierForm.get('type_lieu')?.value,
      adresse: this.foncierForm.get('adresse')?.value,
      lieu: this.foncierForm.get('lieu')?.value,
      ville: this.foncierForm.get('ville')?.value,
      desc_lieu_entrer: this.foncierForm.get('desc_lieu_entrer')?.value,
      has_contrat: this.foncierForm.get('has_contrat')?.value,
      has_amenagements: this.foncierForm.get('has_amenagements')?.value,
      superficie: this.foncierForm.get('superficie')?.value,
      etage: this.foncierForm.get('etage')?.value,
      // Amenagement
      amenagement: this.foncierForm.get('amenagementForm')?.value,
    };

    this.fd.append('data', JSON.stringify(foncier));

    this.foncierService.addFoncier(this.fd, this.userMatricule).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.foncierForm.reset();
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

  updateFoncier() {
    this.pushIntoFoncierLieux(this.currentLieu);
    let id = this.foncier._id;

    this.isAmenagementEmpty = false;

    if (this.hasAmenagementCheck == 'ButtonNon') {
      this.isAmenagementEmpty = false;
    } else {
      this.foncierForm.get('amenagementForm')?.value.forEach((element: any) => {
        if (!element.deleted) {
          this.isAmenagementEmpty = true;
        }
      });
    }
    this.selectedImagesLieuEntrer = this.foncier?.imgs_lieu_entrer;

    let foncier: any = {
      proprietaire: this.foncierForm.get('proprietaire')?.value,
      adresse: this.foncierForm.get('adresse')?.value,
      // lieu: this.foncierLieux,
      lieu: this.foncierLieux,
      etat_du_bien: this.foncierForm.get('etat_du_bien')?.value,
      ville: this.foncierForm.get('ville')?.value,
      has_amenagements: this.isAmenagementEmpty,
      imgs_lieu_entrer: this.selectedImagesLieuEntrer,

      type_lieu: this.foncierForm.get('type_lieu')?.value,
      desc_lieu_entrer: this.foncierForm.get('desc_lieu_entrer')?.value,
      has_contrat: this.foncierForm.get('has_contrat')?.value,
      superficie: this.foncierForm.get('superficie')?.value,
      etage: this.foncierForm.get('etage')?.value,

      // Amenagment
      amenagement: this.foncierForm.get('amenagementForm')?.value,
    };

    this.fd.append('data', JSON.stringify(foncier));

    this.foncierService
      .updateFoncier(id, this.fd, this.userMatricule)
      .subscribe(
        (_) => {
          this.updateDone = true;
          setTimeout(() => {
            this.foncierForm.reset();
            this.updateDone = false;
            this.mainModalService.close();
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

  ngOnDestroy() {
    if (this.lieuxSubscription$) this.lieuxSubscription$.unsubscribe();
    if (this.citiesSubscription$) this.citiesSubscription$.unsubscribe();
  }

  // Foncier Lieu is the Array that has All this foncier's lieux , that's gonna be stored in the DB
  pushIntoFoncierLieux(lieu: any) {
    this.foncierLieux.push({
      deleted: lieu.deleted,
      transferer: lieu.transferer,
      lieu: lieu.lieu._id,
    });
  }

  // Current Lieu is the lieu object that its rendreing now
  fillCurrentLieuObject(lieu: any) {
    this.currentLieu = {
      deleted: lieu.deleted,
      transferer: lieu.transferer,
      lieu: lieu.lieu,
    };

    this.selectedLieuId = '';
  }

  // find the ( lieu ) by its _id from the lieu list
  findLieu(lieuId: any) {
    for (let index = 0; index < this.lieux.length; index++) {
      if (this.lieux[index]._id == lieuId) {
        return this.lieux[index];
      }
    }
  }

  // put a value in Intitule lieu field
  getIntitulerLieu() {
    let Lieu = this.findLieu(this.selectedLieuId);
    if (Lieu) this.Intituler_lieu = Lieu.intitule_lieu;
  }

  openConfirmationModal(id: any) {
    this.ConfirmationModalService.open(id);
  }

  closeConfirmationModal(id: any) {
    this.ConfirmationModalService.close(id);
  }

  ATransferer() {
    this.currentLieu.transferer = true;
    this.closeConfirmationModal(this.ATransfereModalId);
  }

  Transferer() {
    this.currentLieu.deleted = true;
    this.pushIntoFoncierLieux(this.currentLieu);

    this.closeConfirmationModal(this.TransfereModalId);
    this.currentLieu = null;
    this.selectedLieuId = '';
    this.selectedType = '';
    this.Intituler_lieu = '';
    this.lieuxByType = [];
  }

  annulerTransfere() {
    this.currentLieu.transferer = false;
    this.closeConfirmationModal(this.AnnulerTransfereModalId);
  }

  addNewLocal() {
    // let Lieu = this.findLieu(this.selectedLieuId)
    let Lieu = this.findLieu(this.selectedLieuId);

    // Create the ( lieu ) structure with the inserted data
    let lieuData = {
      deleted: false,
      transferer: false,
      lieu: {
        _id: Lieu._id,
        code_lieu: Lieu.code_lieu,
        type_lieu: Lieu.type_lieu,
        intitule_lieu: Lieu.intitule_lieu,
      },
    };

    this.fillCurrentLieuObject(lieuData);
  }

  public toggelFournisseur(isAdd: boolean, ...args: any): void {
    this.isFournisseurExist = isAdd;

    isAdd && this.addFournisseur(args[0], args[1], 'New');
    !isAdd && this.removeFournisseur(args[0], args[1], args[2]);
  }

  get amenagementForm(): FormArray {
    return <FormArray>this.foncierForm.get('amenagementForm');
  }

  get lieuForm(): FormArray {
    return <FormArray>this.foncierForm.get('lieuForm');
  }

  get adresse() {
    return this.foncierForm.get('adresse');
  }

  get ville() {
    return this.foncierForm.get('ville');
  }

  get type_lieu() {
    return this.foncierForm.get('type_lieu');
  }

  get lieu() {
    return this.foncierForm.get('lieu');
  }
}

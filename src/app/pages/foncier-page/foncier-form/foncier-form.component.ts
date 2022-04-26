import { Foncier } from './../../../models/Foncier';
import { FoncierService } from './../../../services/foncier-service/foncier.service';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Inject,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { getCitiesAction } from 'src/app/store/shared/shared.action';
import { DOCUMENT } from '@angular/common';
import { getCities } from 'src/app/store/shared/shared.selector';
import {
  getLieux,
  // getLieuxByType,
} from '../../lieux-page/lieux-store/lieux.selector';
import { Lieu } from 'src/app/models/Lieu';
import { getLieuxAction } from '../../lieux-page/lieux-store/lieux.actions';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal-service/confirmation-modal.service';
import { LieuxService } from '@services/lieux-service/lieux.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foncier-form',
  templateUrl: './foncier-form.component.html',
  styleUrls: ['./foncier-form.component.scss'],
})
export class FoncierFormComponent implements OnInit, OnDestroy, OnChanges {
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
    private lieuService: LieuxService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.foncierForm = new FormGroup({
      type_lieu: new FormControl('', [Validators.required]),
      adresse: new FormControl('', [Validators.required]),
      lieu: new FormControl('', [Validators.required]),
      ville: new FormControl('', [Validators.required]),
      desc_lieu_entrer: new FormControl(''),
      contrat: new FormControl(''),
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

  scrollToTop() {
    this.help.scrollToTop();
  }

  getCities() {
    this.citiesSubscription$ = this.store
      .select(getCities)
      .subscribe((data) => {
        if (data) this.cities = data;
        if (data.length === 0) this.fetchCities();
      });
  }

  // Get all lieux
  getAllLieux() {
    // Select lieux from store
    this.lieuxSubscription$ = this.store.select(getLieux).subscribe((data) => {
      // Check if lieux data is empty then fetch it from server
      if (data) this.lieux = data;
      // Dispatch action to handle the NgRx get lieux from server effect
      if (data.length === 0) this.fetchLieux();
    });
  }

  getLieuxByType(type: string) {
    // this.store.select(getLieuxByType, { type_lieu: type }).subscribe((data) => {
    //   if (data) this.lieuxByType = data;
    // });
    this.lieuService
      .getLieuByType(this.userMatricule, { type_lieu: type })
      .subscribe((data) => {
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

  // (click)="checkValue(amenagementForm.controls[i], nature.id + '-' + i)"
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
      contrat: this.foncier.contrat,
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

      // Check natures
      amenagementControl.nature_amenagement.forEach((nature: string) => {
        formGroupAmenagement.value.nature_amenagement.forEach(
          (elementNature: any) => {
            if (elementNature.name === nature) {
              elementNature.checked = true;
            }
          }
        );
      });

      formGroupAmenagement.controls.idm.setValue(amenagementControl.idm);

      formGroupAmenagement.controls.images_apres_travaux.setValue(
        amenagementControl.images_apres_travaux
      );

      formGroupAmenagement.controls.croquis_travaux.setValue(
        amenagementControl.croquis_travaux
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

      formGroupAmenagement.controls.fournisseur.setValue(
        amenagementControl.fournisseur
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

      if (!amenagementControl.deleted) {
        this.hasAmenagement = true;
      }
    });

    if (HasAmenagement === 'Oui') {
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
      nature_amenagement: new FormControl([
        {
          id: '1',
          name: 'Construction',
          checked: false,
        },
        {
          id: '2',
          name: 'Démolition',
          checked: false,
        },
        {
          id: '3',
          name: 'Plomberie',
          checked: false,
        },
        {
          id: '4',
          name: 'Peinture',
          checked: false,
        },
        {
          id: '5',
          name: 'Menuiserie',
          checked: false,
        },
        {
          id: '6',
          name: 'Électricité',
          checked: false,
        },
        {
          id: '7',
          name: 'Autre',
          checked: false,
        },
      ]),
      montant_amenagement: new FormControl(''),
      valeur_nature_chargeProprietaire: new FormControl(''),
      valeur_nature_chargeFondation: new FormControl(''),
      numero_facture: new FormControl(''),
      numero_bon_commande: new FormControl(''),
      date_passation_commande: new FormControl(''),
      evaluation_fournisseur: new FormControl(''),
      date_fin_travaux: new FormControl(''),
      date_livraison_local: new FormControl(''),
      fournisseur: new FormControl(''),
      images_apres_travaux_files: new FormControl(''),
      images_apres_travaux: new FormControl(''),
      croquis_travaux_files: new FormControl(''),
      croquis_travaux: new FormControl(''),
      deleted: new FormControl(deleted),
      NewOrOld: new FormControl(NewOrOld),
      has_fournisseur: new FormControl(false),
    });

    (<FormArray>this.foncierForm.get('amenagementForm')).push(
      <FormGroup>amenagementData
    );

    return <FormGroup>amenagementData;
  }

  removeAmenagement(index: number) {
    // (<FormArray>this.foncierForm.get('amenagementForm')).removeAt(index)

    let Amenagement = <FormArray>this.foncierForm.get('amenagementForm');

    if (Amenagement.value[index].NewOrOld === 'NewAmng') {
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

  checkValue(amenagementForm: any, id: string) {
    let checkbox = document.getElementById(id) as HTMLInputElement;
    let val = checkbox.value;
    let checkedValue = false;

    if (checkbox.checked) checkedValue = true;
    if (!checkbox.checked) checkedValue = false;

    amenagementForm.value?.nature_amenagement.forEach((nature: any) => {
      if (nature.name === val) {
        nature.checked = checkedValue;
      }
    });
  }

  hasAmengmnt(HasAmng: string) {
    if (HasAmng === 'Oui') {
      this.hasAmenagement = true;
      this.hasAmenagementCheck = '';
    } else {
      this.hasAmenagement = false;
      this.hasAmenagementCheck = 'ButtonNon';
    }
  }

  //Upload Image amenagement avant amenagement
  onFileSelected(event: any, fileName: string) {
    if (event.target.files.length > 0) {
      this.help.selecteFiles(event, this.fd, fileName);
    }
  }

  //Upload Image amenagement après amenagement
  onFileSelectedAmenagement(event: any, fileName: string, index: number) {
    // if (event.target.files.length > 0) {
    //   // this.selectedFile = event.target.files[0];
    //   if (!this.update) {
    //     this.file = this.idm + index + this.imageExtension;
    //     // this.fd.append('imgs_amenagement', this.selectedFile, this.file);
    //     this.help.selecteAmenagementFiles(event, this.fd, fileName)
    //     this.fd.append('file',this.file);
    //   }
    //   if (this.update && this.foncier.amenagement[index]?.idm === undefined) {
    //     this.file = this.idm + index + this.imageExtension;
    //     // this.fd.append('imgs_amenagement', this.selectedFile, this.file);
    //    this.help.selecteAmenagementFiles(event, this.fd, fileName)
    //    this.fd.append('file',this.file);

    //   }
    //   if (this.update && this.foncier.amenagement[index]?.idm !== undefined) {
    //     this.file = this.foncier.amenagement[index]?.idm + this.imageExtension;
    //     // this.fd.append('imgs_amenagement', this.selectedFile, this.file);
    //    this.help.selecteAmenagementFiles(event, this.fd, fileName)
    //    this.fd.append('file',this.file);
    //   }
    // }

    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      if (!this.update) {
        this.file = this.idm + index + this.imageExtension;
        this.fd.append(fileName, this.selectedFile, this.file);
      }
      if (this.update && this.foncier.amenagement[index]?.idm === undefined) {
        this.file = this.idm + index + this.imageExtension;
        this.fd.append(fileName, this.selectedFile, this.file);
      }
      if (this.update && this.foncier.amenagement[index]?.idm !== undefined) {
        this.file = this.foncier.amenagement[index]?.idm + this.imageExtension;
        this.fd.append(fileName, this.selectedFile, this.file);
      }
    }
  }

  //Upload Croquis
  // onFileSelectedCroquis(event: any, index: number) {
  //   if (event.target.files.length > 0) {
  //     this.selectedFile = event.target.files[0];
  //     if (!this.update) {
  //       this.file = this.idm + index + this.imageExtension;
  //       this.fd.append('imgs_croquis', this.selectedFile, this.file);
  //     }
  //     if (this.update && this.foncier.amenagement[index]?.idm ==== undefined) {
  //       this.file = this.idm + index + this.imageExtension;
  //       this.fd.append('imgs_croquis', this.selectedFile, this.file);
  //     }
  //     if (this.update && this.foncier.amenagement[index]?.idm !=== undefined) {
  //       this.file = this.foncier.amenagement[index]?.idm + this.imageExtension;
  //       this.fd.append('imgs_croquis', this.selectedFile, this.file);
  //     }
  //   }
  // }

  //Upload Image amenagement avant amenagement
  // onFileSelected(event: any) {
  //   if (event.target.files.length > 0) {
  //     // this.selectedFile = event.target.files[0];
  //     // this.fd.append('imgs_lieu_entrer', this.selectedFile);
  //     let myFiles = []
  //     for (var i = 0; i < event.target.files.length; i++) {
  //       myFiles.push(event.target.files[i]);
  //     }

  //     for (var i = 0; i < 8; i++) {
  //       this.fd.append(`imgs_lieu_entrer${i + 1}`, myFiles[i]);
  //     }

  //     for (var i = 0; i < 8; i++) {
  //       console.log(this.fd.get(`imgs_lieu_entrer${i + 1}`));
  //     }
  //   }
  // }

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

  getCheckedNatures(amenagement: any) {
    let natureNames = [];
    let checkedNatures = amenagement.nature_amenagement.filter(
      (nature: any) => {
        return nature.checked === true;
      }
    );

    for (let nature of checkedNatures) {
      natureNames.push(nature.name);
    }

    amenagement.nature_amenagement = natureNames;
  }

  addFoncier() {
    // Get checked natures name
    this.foncierForm
      .get('amenagementForm')
      ?.value.forEach((amenagement: any) => {
        this.getCheckedNatures(amenagement);
      });

    let foncier: Foncier = {
      type_lieu: this.foncierForm.get('type_lieu')?.value,
      adresse: this.foncierForm.get('adresse')?.value,
      lieu: this.foncierForm.get('lieu')?.value,
      ville: this.foncierForm.get('ville')?.value,
      desc_lieu_entrer: this.foncierForm.get('desc_lieu_entrer')?.value,
      contrat: this.foncierForm.get('contrat')?.value,
      has_amenagements: this.foncierForm.get('has_amenagements')?.value,
      superficie: this.foncierForm.get('superficie')?.value,
      etage: this.foncierForm.get('etage')?.value,
      // Amenagement
      amenagement: this.foncierForm.get('amenagementForm')?.value,
    };

    this.fd.append('data', JSON.stringify(foncier));
    this.foncierService.addFoncier(this.fd, this.userMatricule).subscribe(
      (id) => {
        this.postDone = true;
        setTimeout(() => {
          this.foncierForm.reset();
          this.postDone = false;
          this.router.navigate(['/contrat/',id])
        }, 3000);
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
    // Get checked natures name
    this.foncierForm
      .get('amenagementForm')
      ?.value.forEach((amenagement: any) => {
        this.getCheckedNatures(amenagement);
      });

    this.isAmenagementEmpty = false;

    if (this.hasAmenagementCheck === 'ButtonNon') {
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
      contrat: this.foncierForm.get('contrat')?.value,
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
          }, 3000);
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

  // find the ( lieu ) by its _id from the lieu list
  findLieu(lieuId: any) {
    for (let index = 0; index < this.lieux.length; index++) {
      if (this.lieux[index]._id === lieuId) {
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

  // :::: Lieu ::::
  addNewLocal() {
    // Update current lieu and push it to our array
    this.currentLieu.deleted = true;
    this.pushIntoFoncierLieux(this.currentLieu);

    // Create the ( lieu ) structure with the inserted data
    let Lieu = this.findLieu(this.selectedLieuId);
    let lieuData = {
      deleted: false,
      etat_lieu: 'Occupé',
      lieu: {
        _id: Lieu._id,
        code_lieu: Lieu.code_lieu,
        type_lieu: Lieu.type_lieu,
        intitule_lieu: Lieu.intitule_lieu,
        attached_DR: Lieu.attached_DR
      },
    };

    this.fillCurrentLieuObject(lieuData);
  }

  ATransferer() {
    // this.currentLieu.transferer = true;
    this.currentLieu.etat_lieu = 'En cours de transfert';
    this.closeConfirmationModal(this.ATransfereModalId);
  }

  Transferer() {
    // this.currentLieu.deleted = true;
    this.currentLieu.etat_lieu = 'Transféré';
    // this.pushIntoFoncierLieux(this.currentLieu);

    this.closeConfirmationModal(this.TransfereModalId);
    // this.currentLieu = null;
    this.selectedLieuId = '';
    this.selectedType = '';
    this.Intituler_lieu = '';
    this.lieuxByType = [];
  }

  annulerTransfere() {
    this.currentLieu.etat_lieu = 'Occupé';
    this.closeConfirmationModal(this.AnnulerTransfereModalId);
  }

  // Current Lieu is the lieu object that its rendreing now
  fillCurrentLieuObject(lieu: any) {
    this.currentLieu = {
      deleted: lieu.deleted,
      // transferer: lieu.transferer,
      etat_lieu: lieu.etat_lieu,
      lieu: lieu.lieu[0] || lieu.lieu,
    };

    this.selectedLieuId = '';
  }

  // Foncier Lieu is the Array that has All this foncier's lieux , that's gonna be stored in the DB
  pushIntoFoncierLieux(lieu: any) {    
    if (lieu != null) {
      this.foncierLieux.push({
        deleted: lieu.deleted,
        // transferer: lieu.transferer,
        etat_lieu: lieu.etat_lieu,
        lieu: lieu.lieu[0]?._id != undefined ? lieu.lieu[0]._id : lieu.lieu._id,
      });
    }
  }
  // Afficher « En cours de transfert » et « Transféré » sur la liste des locaux , sous l’intitulé (c’est pas la peine de créer une nouvelle colonne)

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

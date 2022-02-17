import { getDrWithSupAction } from './../../lieux-store/lieux.actions';
import { Component, Input, OnInit, OnDestroy, Inject, OnChanges } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Lieu } from 'src/app/models/Lieu';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal-service/confirmation-modal.service';
import { LieuxService } from 'src/app/services/lieux-service/lieux.service';
import { AppState } from 'src/app/store/app.state';
import { MainModalService } from '../../../../services/main-modal/main-modal.service';
import { getDr } from '../../lieux-store/lieux.selector';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lf-form',
  templateUrl: './lf-form.component.html',
  styleUrls: ['./lf-form.component.scss'],
})
export class LfFormComponent implements OnInit, OnDestroy, OnChanges {
  modalHeight: string = '40vh';
  etatLogement = '';
  isReplace: string = '';
  Dr!: any;
  DrSubscription$!: Subscription;
  lieux: Lieu[] = [];
  FullNameDerct: string = '';

  @Input() update!: boolean;
  @Input() Lieu!: any;
  @Input() LieuName!: string;

  DirecteurForm!: FormGroup;
  lF!: Lieu;
  LfForm!: FormGroup;
  errors!: string;
  postDone: boolean = false;
  PostSucces: string = 'Logement de fonction ajouté avec succés';
  updateDone: boolean = false;
  updateSucces: string = 'Logement de fonction modifié avec succés';

  userMatricule: any = localStorage.getItem('matricule');

  intituleLF: string = "--";

  constructor(
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private help: HelperService,
    private lieuService: LieuxService,
    private store: Store<AppState>,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnChanges() {
    if (this.Lieu !== '') {
      setTimeout(() => {
        this.fetchLf();
      }, 100);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////
  showEtatLogement() {
    this.etatLogement = this.LfForm.value.etat_logement_fonction;
  }

  //////////////////////////////////////////////////////////////////////////////////
  ngOnInit(): void {
    this.LfForm = new FormGroup({
      code_lieu: new FormControl('', [
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern('[0-9]*'),
      ]),
      intitule_lieu: new FormControl(''),
      code_localite: new FormControl(''),
      telephone: new FormControl('', [
        Validators.pattern('[0-9]*'),
        Validators.maxLength(10),
      ]),
      fax: new FormControl('', [
        Validators.pattern('[0-9]*'),
        Validators.maxLength(10),
      ]),
      type_lieu: new FormControl(''),
      code_rattache_DR: new FormControl(''),
      code_rattache_SUP: new FormControl(''),
      intitule_rattache_SUP_PV: new FormControl(''),
      centre_cout_siege: new FormControl(''),
      categorie_pointVente: new FormControl(''),
      deleted: new FormControl(''),
      etat_logement_fonction: new FormControl(''),

      //Directeur
      matricule_directeur: new FormControl(''),
      nom_directeur: new FormControl(''),
      prenom_directeur: new FormControl(''),
      deleted_directeur: new FormControl(''),

      directeur_regional: new FormArray([]),
    });
    this.getDr();
  }

  fetchLf() {
    this.RemoveAllDericteurs();

    this.etatLogement = this.Lieu.etat_logement_fonction;

    this.LfForm.patchValue({
      code_lieu: this.Lieu.code_lieu,
      intitule_lieu: this.Lieu.intitule_lieu,
      code_localite: this.Lieu.code_localite,
      telephone: this.Lieu.telephone,
      fax: this.Lieu.fax,
      etat_logement_fonction: this.Lieu.etat_logement_fonction,
      type_lieu: this.Lieu.type_lieu,
      code_rattache_DR: this.Lieu.code_rattache_DR,
      code_rattache_SUP: this.Lieu.code_rattache_SUP,
      intitule_rattache_SUP_PV: this.Lieu.intitule_rattache_SUP_PV,
      centre_cout_siege: this.Lieu.centre_cout_siege,
      categorie_pointVente: this.Lieu.categorie_pointVente,
    });

    // Directeur
    this.Lieu.directeur_regional.forEach((directeur: any) => {
      let NewDirecteur = this.addDirecteur();

      NewDirecteur.controls.matricule.setValue(directeur.matricule);
      NewDirecteur.controls.nom.setValue(directeur.nom);
      NewDirecteur.controls.prenom.setValue(directeur.prenom);
      NewDirecteur.controls.deleted_directeur.setValue(
        directeur.deleted_directeur
      );

      if (!directeur.deleted_directeur) {
        this.LfForm.patchValue({
          // directeur_regional
          matricule_directeur: directeur.matricule,
          nom_directeur: directeur.nom,
          prenom_directeur: directeur.prenom,
          deleted_directeur: false,
        });

        this.FullNameDerct = directeur.nom + ' ' + directeur.prenom;
      }
    });
  }

  // Check if all inputs has invalid errors
  checkInputsValidation(targetInput: any) {
    return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
  }

  addDirecteur() {
    const DirecteurData = new FormGroup({
      matricule: new FormControl(''),
      nom: new FormControl(''),
      prenom: new FormControl(''),
      deleted_directeur: new FormControl(''),
    });

    (<FormArray>this.LfForm.get('directeur_regional')).push(
      <FormGroup>DirecteurData
    );

    return <FormGroup>DirecteurData;
  }

  RemoveAllDericteurs() {
    (<FormArray>this.LfForm.get('directeur_regional')).clear();
  }

  RemplacerDirecteur() {
    let Matricule = (
      document.getElementById('Mat_directeur') as HTMLInputElement
    ).value;
    let Nom = (document.getElementById('Nom_directeur') as HTMLInputElement)
      .value;
    let Prenom = (
      document.getElementById('Prenom_directeur') as HTMLInputElement
    ).value;

    this.LfForm.patchValue({
      etat_logement_fonction: 'occupe',
      // Directeur regional
      matricule_directeur: Matricule,
      nom_directeur: Nom,
      prenom_directeur: Prenom,
      deleted_directeur: false,
    });

    this.etatLogement = 'occupe';

    this.LfForm.get('directeur_regional')?.value.forEach((directeur: any) => {
      directeur.deleted_directeur = true;
    });

    let NewDirecteur = this.addDirecteur();

    NewDirecteur.controls.matricule.setValue(Matricule);
    NewDirecteur.controls.nom.setValue(Nom);
    NewDirecteur.controls.prenom.setValue(Prenom);
    NewDirecteur.controls.deleted_directeur.setValue(false);

    this.confirmationModalService.close();
    this.isReplace = '';
    this.FullNameDerct = Nom + ' ' + Prenom;
  }

  ModifierDirecteur() {
    this.LfForm.get('directeur_regional')?.value.forEach((directeur: any) => {
      if (!directeur.deleted_directeur) {
        directeur.matricule = this.LfForm.get('matricule_directeur')?.value;
        directeur.nom = this.LfForm.get('nom_directeur')?.value;
        directeur.prenom = this.LfForm.get('prenom_directeur')?.value;

        this.LfForm.patchValue({
          // directeur_regional
          matricule_directeur: directeur.matricule,
          nom_directeur: directeur.nom,
          prenom_directeur: directeur.prenom,
        });

        this.FullNameDerct = directeur.nom + ' ' + directeur.prenom;
      }
    });

    this.isReplace = '';
  }

  SupprimerDirecteur() {
    this.LfForm.get('directeur_regional')?.value.forEach((directeur: any) => {
      if (!directeur.deleted_directeur) {
        directeur.deleted_directeur = true;
      }

      this.LfForm.patchValue({
        etat_logement_fonction: 'disponible',
        matricule_directeur: '',
        nom_directeur: '',
        prenom_directeur: '',
        deleted_directeur: false,
      });
    });

    this.etatLogement = 'disponible';

    this.confirmationModalService.close();
  }

  //////////////////////////////////////////////////////////////////////////////////
  openReplaceModal(active: any) {
    this.isReplace = active;
    // this.mainModel.open();
    // this.confirmationModalService.open();
  }

  //////////////////////////////////////////////////////////////////////////////////
  closeReplaceModal() {
    // this.isReplace = false;
    this.mainModalService.close();
  }

  //////////////////////////////////////////////////////////////////////////////////
  openConfirmationModal() {
    this.confirmationModalService.open();
  }

  //////////////////////////////////////////////////////////////////////////////////
  openUpdate() {
    this.mainModalService.open();
  }

  //////////////////////////////////////////////////////////////////////////////////
  closeConfirmationModal() {
    this.confirmationModalService.close();
    // this.isReplace='';
  }

  //////////////////////////////////////////////////////////////////////////////////
  switchIsReplace() {
    this.isReplace = '';
  }

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  scrollToTop(){
    let element : HTMLElement = document.getElementById('form_content') as HTMLElement;    
    element.scrollIntoView({behavior: "smooth", block: "start"});
  }

  // Get intitule lf by code dr 
  displayIntituleLF() {
    const codeDR = this.LfForm.get('code_rattache_DR')?.value;

    for (let i = 0; i < this.Dr.length; i++) {
      if (this.Dr[i].code_lieu == codeDR) {
        this.intituleLF = `LF/${this.Dr[i].intitule_lieu}`;
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////////
  addLf() {
    let lfData: any = {
      code_lieu: this.LfForm.get('code_lieu')?.value,
      intitule_lieu: this.LfForm.get('intitule_lieu')?.value,
      code_localite: this.LfForm.get('code_localite')?.value,
      telephone: this.LfForm.get('telephone')?.value,
      fax: this.LfForm.get('fax')?.value,
      etat_logement_fonction: this.LfForm.get('etat_logement_fonction')?.value,
      type_lieu: this.LieuName,
      code_rattache_DR: this.LfForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.LfForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.LfForm.get('intitule_rattache_SUP_PV')
        ?.value,
      centre_cout_siege: this.LfForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.LfForm.get('categorie_pointVente')?.value,

      // Directeur
      directeur_regional: [
        {
          matricule: this.LfForm.get('matricule_directeur')?.value,
          nom: this.LfForm.get('nom_directeur')?.value,
          prenom: this.LfForm.get('prenom_directeur')?.value,
        },
      ],
      // directeur_regional: [],

      // Amenagement
      amenagement: this.LfForm.get('amenagementForm')?.value,
    };

    this.lieuService.addLieu(lfData, this.userMatricule).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.LfForm.reset();
          this.postDone = false;
          this.router.navigate(['/lieux/list']).then(() => {
            this.help.refrechPage();
          });
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

  //////////////////////////////////////////////////////////////////////////////////

  updateLf() {
    let idlf = this.Lieu._id;

    let lfData: any = {
      code_lieu: this.LfForm.get('code_lieu')?.value,
      intitule_lieu: this.LfForm.get('intitule_lieu')?.value,
      code_localite: this.LfForm.get('code_localite')?.value,
      telephone: this.LfForm.get('telephone')?.value,
      fax: this.LfForm.get('fax')?.value,
      etat_logement_fonction: this.LfForm.get('etat_logement_fonction')?.value,
      type_lieu: this.LfForm.get('type_lieu')?.value,
      code_rattache_DR: this.LfForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.LfForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.LfForm.get('intitule_rattache_SUP_PV')
        ?.value,
      centre_cout_siege: this.LfForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.LfForm.get('categorie_pointVente')?.value,

      // Directeur
      directeur_regional: this.LfForm.get('directeur_regional')?.value,
    };

    this.lieuService.updateLieux(idlf, lfData, this.userMatricule).subscribe(
      (_) => {
        this.updateDone = true;
        setTimeout(() => {
          this.mainModalService.close();
          this.LfForm.reset();
          this.updateDone = false;
          location.reload();
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

  // Get Dr and Sup from the server
  getDrSup() {
    return this.store.dispatch(getDrWithSupAction());
  }

  // Select Dr
  getDr() {
    this.DrSubscription$ = this.store.select(getDr).subscribe((data) => {
      if (data) this.Dr = data;
      if (!data) this.getDrSup();
    });
  }

  ngOnDestroy() {
    if (this.DrSubscription$) this.DrSubscription$.unsubscribe();
  }

  //////////////////////////////////////////////////////////////////////////////////

  get code_lieu() {
    return this.LfForm.get('code_lieu');
  }

  get intitule_lieu() {
    return this.LfForm.get('intitule_lieu');
  }

  get code_localite() {
    return this.LfForm.get('code_localite');
  }

  get telephone() {
    return this.LfForm.get('telephone');
  }

  get fax() {
    return this.LfForm.get('fax');
  }

  get etat_logement_fonction() {
    return this.LfForm.get('etat_logement_fonction');
  }

  get type_lieu() {
    return this.LfForm.get('type_lieu');
  }

  get code_rattache_DR() {
    return this.LfForm.get('code_rattache_DR');
  }

  get code_rattache_SUP() {
    return this.LfForm.get('code_rattache_SUP');
  }

  get centre_cout_siege() {
    return this.LfForm.get('centre_cout_siege');
  }
}

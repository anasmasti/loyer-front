import { Router } from '@angular/router';
import { AppState } from './../../../../store/app.state';
import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  OnChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
export class SvFormComponent implements OnInit, OnDestroy, OnChanges {
  svForm!: FormGroup;
  errors!: any;
  postDone: boolean = false;
  PostSucces: string = 'Supervision ajouté avec succés';
  updateDone: boolean = false;
  updateSucces: string = 'Supervision modifié avec succés';
  Dr!: any;
  DrSubscription$!: Subscription;
  intitule_rattache_DR: any = '';

  @Input() update!: boolean;
  @Input() Lieu!: any;
  @Input() LieuName!: string;

  userMatricule: any = localStorage.getItem('matricule');

  constructor(
    private svService: LieuxService,
    private lieuService: LieuxService,
    private mainModalService: MainModalService,
    private help: HelperService,
    private store: Store<AppState>,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnChanges() {
    if (this.Lieu !== '') {
      setTimeout(() => {
        this.fetchSv();
      }, 100);
    }
  }

  ngOnInit(): void {
    this.svForm = new FormGroup({
      code_lieu: new FormControl('', [
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern('[0-9]*'),
      ]),
      intitule_lieu: new FormControl('', [Validators.required]),
      code_localite: new FormControl(''),
      etat_logement_fonction: new FormControl(''),
      type_lieu: new FormControl(''),
      code_rattache_DR: new FormControl('', [Validators.required]),
      code_rattache_SUP: new FormControl(''),
      intitule_rattache_SUP_PV: new FormControl(''),
      centre_cout_siege: new FormControl(''),
      categorie_pointVente: new FormControl(''),
      telephone: new FormControl(''),
      fax: new FormControl('', [
        Validators.pattern('[0-9]*'),
        Validators.maxLength(10),
      ]),
    });

    this.getDr();
  }

  fetchSv() {

    this.svForm.patchValue({
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

    this.displayIntituleDR();
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

  onAddSv() {
    let svData: any = {
      code_lieu: this.svForm.get('code_lieu')?.value,
      intitule_lieu: this.svForm.get('intitule_lieu')?.value,
      code_localite: this.svForm.get('code_localite')?.value,
      telephone: this.svForm.get('telephone')?.value,
      fax: this.svForm.get('fax')?.value,
      etat_logement_fonction: this.svForm.get('etat_logement_fonction')?.value,
      type_lieu: this.LieuName,
      code_rattache_DR: this.svForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.svForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.svForm.get('intitule_rattache_SUP_PV')
        ?.value,
      centre_cout_siege: this.svForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.svForm.get('categorie_pointVente')?.value,
    };

    this.svService.addLieu(svData, this.userMatricule).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.svForm.reset();
          this.postDone = false;
          this.router.navigate(['/lieux/list']).then(() => {
            this.help.refrechPage();
          });
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

    let SvData: any = {
      code_lieu: this.svForm.get('code_lieu')?.value,
      intitule_lieu: this.svForm.get('intitule_lieu')?.value,
      code_localite: this.svForm.get('code_localite')?.value,
      telephone: this.svForm.get('telephone')?.value,
      fax: this.svForm.get('fax')?.value,
      etat_logement_fonction: this.svForm.get('etat_logement_fonction')?.value,
      type_lieu: this.svForm.get('type_lieu')?.value,
      code_rattache_DR: this.svForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.svForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.svForm.get('intitule_rattache_SUP_PV')
        ?.value,
      centre_cout_siege: this.svForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.svForm.get('categorie_pointVente')?.value,
    };


    this.lieuService.updateLieux(id, SvData, this.userMatricule).subscribe(
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
    this.DrSubscription$ = this.store.select(getDr).subscribe((data) => {
      if (data) {this.Dr = data;
      this.displayIntituleDR();}
      if (!data) this.getDrSup();
      // fetch intitule Dr
    });
  }

  displayIntituleDR() {
    const codeDR = this.svForm.get('code_rattache_DR')?.value;

    for (let i = 0; i < this.Dr.length; i++) {
      if (this.Dr[i].code_lieu == codeDR) {
        this.intitule_rattache_DR = this.Dr[i].intitule_lieu;
      }
    }
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

  get code_localite() {
    return this.svForm.get('code_localite');
  }

  get etat_logement_fonction() {
    return this.svForm.get('etat_logement_fonction');
  }

  get telephone() {
    return this.svForm.get('telephone');
  }

  get fax() {
    return this.svForm.get('fax');
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
}

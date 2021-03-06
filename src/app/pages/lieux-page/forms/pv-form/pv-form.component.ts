import { AppState } from './../../../../store/app.state';
import { MainModalService } from './../../../../services/main-modal/main-modal.service';
import { LieuxService } from './../../../../services/lieux-service/lieux.service';
import {
  Component,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getDrWithSupAction } from '../../lieux-store/lieux.actions';
import { getSup, getDr } from '../../lieux-store/lieux.selector';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pv-form',
  templateUrl: './pv-form.component.html',
  styleUrls: ['./pv-form.component.scss'],
})
export class PvFormComponent implements OnInit, OnDestroy, OnChanges {
  PvForm!: FormGroup;
  errors!: string;
  postDone: boolean = false;
  PostSucces: string = 'Point de vente ajouté avec succés';
  updateDone: boolean = false;
  updateSucces: string = 'Point de vente modifié avec succés';
  Dr!: any;
  Sup!: any;
  DrSubscription$!: Subscription;
  SupSubscription$!: Subscription;
  intitule_rattache_SUP!: any;
  intitule_rattache_DR!: any;
  codeRattacheDR!: any;

  @Input() update!: boolean;
  @Input() Lieu!: any;
  @Input() LieuName!: string;

  userMatricule: any = localStorage.getItem('matricule');

  constructor(
    private mainModalService: MainModalService,
    private lieuService: LieuxService,
    private store: Store<AppState>,
    private help: HelperService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnChanges() {
    if (this.Lieu !== '') {
      setTimeout(() => {
        this.fetchPv();
      }, 100);
    }
  }

  ngOnInit(): void {
    this.PvForm = new FormGroup({
      code_lieu: new FormControl('', [
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern('[0-9]*'),
      ]),
      intitule_lieu: new FormControl('', [Validators.required]),
      code_localite: new FormControl(''),
      etat_logement_fonction: new FormControl(''),
      type_lieu: new FormControl(''),
      code_rattache_DR: new FormControl(''),
      code_rattache_SUP: new FormControl(''),
      intitule_rattache_SUP_PV: new FormControl(''),
      centre_cout_siege: new FormControl(''),
      categorie_pointVente: new FormControl(''),
      telephone: new FormControl('', [
        Validators.pattern('[0-9]*'),
        Validators.maxLength(10),
      ]),
      fax: new FormControl('', [
        Validators.pattern('[0-9]*'),
        Validators.maxLength(10),
      ]),
      attached_DR: new FormControl(''),
      attached_SUP: new FormControl('',Validators.required),
    });

    this.getDr();
    this.getSup();
  }

  fetchPv() {
    this.PvForm.patchValue({
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
      attached_DR: this.Lieu.attached_DR?._id,
      attached_SUP: this.Lieu.attached_SUP?._id
    });

    this.fillSupAndDR();
    // this.displayIntituleDR();
  }

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  scrollToTop() {
    this.help.scrollToTop();
  }

  // Check if all inputs has invalid errors
  checkInputsValidation(targetInput: any) {
    return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
  }

  addPv() {
    let pvData: any = {
      code_lieu: this.PvForm.get('code_lieu')?.value,
      intitule_lieu: this.PvForm.get('intitule_lieu')?.value,
      code_localite: this.PvForm.get('code_localite')?.value,
      telephone: this.PvForm.get('telephone')?.value,
      fax: this.PvForm.get('fax')?.value,
      etat_logement_fonction: this.PvForm.get('etat_logement_fonction')?.value,
      type_lieu: this.LieuName,
      code_rattache_DR: this.codeRattacheDR,
      // this.PvForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.PvForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.intitule_rattache_SUP,
      centre_cout_siege: this.PvForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.PvForm.get('categorie_pointVente')?.value,
      attached_DR: this.getIdLieuByCodeLieu(this.codeRattacheDR),
      attached_SUP: this.PvForm.get('attached_SUP')?.value || null,
    };


    this.lieuService.addLieu(pvData, this.userMatricule).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.PvForm.reset();
          this.postDone = false;
          this.router.navigate(['/foncier']).then(() => {
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

  updatePv() {
    let id = this.Lieu._id;

    let pvData: any = {
      code_lieu: this.PvForm.get('code_lieu')?.value,
      intitule_lieu: this.PvForm.get('intitule_lieu')?.value,
      code_localite: this.PvForm.get('code_localite')?.value,
      telephone: this.PvForm.get('telephone')?.value,
      fax: this.PvForm.get('fax')?.value,
      etat_logement_fonction: this.PvForm.get('etat_logement_fonction')?.value,
      type_lieu: this.PvForm.get('type_lieu')?.value,
      code_rattache_DR: this.codeRattacheDR,
      // this.PvForm.get('code_rattache_DR')?.value,
      code_rattache_SUP: this.PvForm.get('code_rattache_SUP')?.value,
      intitule_rattache_SUP_PV: this.intitule_rattache_SUP,
      centre_cout_siege: this.PvForm.get('centre_cout_siege')?.value,
      categorie_pointVente: this.PvForm.get('categorie_pointVente')?.value,
      attached_DR: this.getIdLieuByCodeLieu(this.codeRattacheDR),
      attached_SUP: this.PvForm.get('attached_SUP')?.value || null,
    };

    this.lieuService.updateLieux(id, pvData, this.userMatricule).subscribe(
      (_) => {
        this.updateDone = true;
        setTimeout(() => {
          this.mainModalService.close();
          this.PvForm.reset();
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

  // Fill Sup and DR inputs
  fillSupAndDR() {
    const idSup = this.PvForm.get('attached_SUP')?.value;
    let check = false

    for (let i = 0; i < this.Sup.length; i++) {
      if (this.Sup[i]._id === idSup) {
        check = true;
        if (idSup != undefined) {
          this.intitule_rattache_SUP = this.Sup[i].intitule_lieu;
          this.codeRattacheDR = this.Sup[i].attached_DR.code_lieu;
          this.intitule_rattache_DR = this.Sup[i].attached_DR.intitule_lieu;
        } else {
          this.intitule_rattache_SUP =
            this.codeRattacheDR =
            this.intitule_rattache_DR =
              '';
        }
      }
    }

    if (!check) {
      this.intitule_rattache_SUP =
        this.codeRattacheDR =
        this.intitule_rattache_DR =
          '';
    }
  }

  getIdLieuByCodeLieu(codeDr: any){
    let idLieu = null
    this.Dr.forEach((dr: any) => {
      if(dr.code_lieu === codeDr ){
        idLieu = dr._id
      } 
    });
    return idLieu
  }
  // Get intitule dr by its code 
  // displayIntituleDR(codeDr: any) {
  //   const codeDR = codeDr;

  //   for (let i = 0; i < this.Dr.length; i++) {
  //     if (this.Dr[i].code_lieu === codeDR) {
  //       return this.Dr[i].intitule_lieu;
  //     }
  //   }
  // }

  // Get Dr and Sup from the server
  getDrSup() {
    this.store.dispatch(getDrWithSupAction());
  }

  // Select Dr
  getDr() {
    this.DrSubscription$ = this.store.select(getDr).subscribe((data) => {
      if (data) {
        this.Dr = data;
      }
      if (!data) this.getDrSup();
    });
  }

  // Select Sup
  getSup() {
    this.SupSubscription$ = this.store.select(getSup).subscribe((data) => {
      if (data) {
        this.Sup = data;
        this.fillSupAndDR();
      }
      if (!data) this.getDrSup();
    });
  }

  getFournisseur(amenagementForm: any, i: number) {
    return amenagementForm.controls[i].controls.fournisseur.controls;
  }

  ngOnDestroy() {
    if (this.DrSubscription$) this.DrSubscription$.unsubscribe();
    if (this.SupSubscription$) this.SupSubscription$.unsubscribe();
  }

  get code_lieu() {
    return this.PvForm.get('code_lieu');
  }

  get intitule_lieu() {
    return this.PvForm.get('intitule_lieu');
  }

  get code_rattache_DR() {
    return this.PvForm.get('code_rattache_DR');
  }

  get code_rattache_SUP() {
    return this.PvForm.get('code_rattache_SUP');
  }

  get telephone() {
    return this.PvForm.get('telephone');
  }

  get fax() {
    return this.PvForm.get('fax');
  }

  get attached_SUP() {
    return this.PvForm.get('attached_SUP');
  }
}

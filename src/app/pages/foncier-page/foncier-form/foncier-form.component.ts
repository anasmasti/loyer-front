import { Foncier } from './../../../models/Foncier';
import { FoncierService } from './../../../services/foncier-service/foncier.service';
import { getProprietaireWithLieuxIdsAction } from './../foncier-store/foncier.actions';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { getLieuxIds, getProprietairesIds } from '../foncier-store/foncier.selector';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'foncier-form',
  templateUrl: './foncier-form.component.html',
  styleUrls: ['./foncier-form.component.scss']
})
export class FoncierFormComponent implements OnInit, OnDestroy {

  @Input() formType!: string;
  errors!: string;
  postDone: boolean = false;
  PostSucces: string = 'Foncier ajouté avec succés';
  foncierForm!: FormGroup;
  proprietaireIds$!: Observable<any>
  lieuxIds$!: Observable<any>
  lieuxIdsSubscription$!: Subscription
  proprietaireIdsSubscription$!: Subscription

  constructor(
    private foncierService: FoncierService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.foncierForm = new FormGroup({
      proprietaire: new FormControl(),
      type_foncier: new FormControl(),
      adresse: new FormControl(),
      description: new FormControl(),
      lieu: new FormControl(),
      assure: new FormControl(),
      etat_du_bien: new FormControl(),
      ville: new FormControl(),
      code_postal: new FormControl(),
      pays: new FormControl(),
      montant_loyer: new FormControl(),
      meuble_equipe: new FormControl(),
    });

    this.getProprietaireIds()
    this.getLieuxIds()
  }

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }
  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  addFoncier() {
    let foncier: Foncier = {
      proprietaire: this.foncierForm.get('proprietaire')?.value,
      type_foncier: this.foncierForm.get('type_foncier')?.value,
      adresse: this.foncierForm.get('adresse')?.value,
      description: this.foncierForm.get('description')?.value,
      lieu: this.foncierForm.get('lieu')?.value,
      assure: this.foncierForm.get('assure')?.value,
      etat_du_bien: this.foncierForm.get('etat_du_bien')?.value,
      ville: this.foncierForm.get('ville')?.value,
      code_postal: this.foncierForm.get('code_postal')?.value,
      pays: this.foncierForm.get('pays')?.value,
      montant_loyer: this.foncierForm.get('montant_loyer')?.value,
      meuble_equipe: this.foncierForm.get('meuble_equipe')?.value,
    }

    this.foncierService.addFoncier(foncier).subscribe(
      (_) => {
        this.postDone = true;
        setTimeout(() => {
          this.foncierForm.reset();
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
    );
  }

  // Get Proprietaire With Lieux Ids from the server
  getProprietaireWithLieuxIds() {
    this.store.dispatch(getProprietaireWithLieuxIdsAction())
  }

  // Select Proprietaire ids
  getProprietaireIds() {
    this.proprietaireIds$ = this.store.select(getProprietairesIds)
    this.proprietaireIdsSubscription$ = this.proprietaireIds$.pipe(debounceTime(500)).subscribe(data => {
      if (!data?.length) this.getProprietaireWithLieuxIds()
    })
  }

  // Select Lieux ids
  getLieuxIds() {
    this.lieuxIds$ = this.store.select(getLieuxIds)
    this.lieuxIdsSubscription$ = this.lieuxIds$.subscribe(data => {
      if (!data?.length) this.getProprietaireWithLieuxIds()
    })
  }

  ngOnDestroy() {
    if (this.lieuxIdsSubscription$) this.lieuxIdsSubscription$.unsubscribe()
    if (this.proprietaireIdsSubscription$) this.proprietaireIdsSubscription$.unsubscribe()
  }
}

import { Foncier } from './../../../models/Foncier';
import { FoncierService } from './../../../services/foncier-service/foncier.service';
import { getPropWithLieuxAction } from './../foncier-store/foncier.actions';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { getLieux, getProprietaires } from '../foncier-store/foncier.selector';
import { debounceTime, delay, map } from 'rxjs/operators';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';

@Component({
  selector: 'foncier-form',
  templateUrl: './foncier-form.component.html',
  styleUrls: ['./foncier-form.component.scss']
})
export class FoncierFormComponent implements OnInit, OnDestroy {

  @Input() formType!: string;
  @Input() foncier!: any;
  errors!: string;
  postDone: boolean = false;
  PostSucces: string = 'Foncier ajouté avec succés';
  updateDone: boolean = false;
  updateSucces: string = 'Foncier modifié avec succés';
  foncierForm!: FormGroup;

  proprietaires!: any
  lieux!: any
  lieuxSubscription$!: Subscription
  proprietairesSubscription$!: Subscription
  countriesSubscription$!: Subscription

  cities!: any
  countries!: any

  userMatricule: any = localStorage.getItem('matricule')

  constructor(
    private foncierService: FoncierService,
    private store: Store<AppState>,
    private help: HelperService,
    private mainModalService: MainModalService,) { }

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

    this.getProprietaires()
    this.getLieux()
    // this.getCountries()
    setTimeout(() => {
      // this.selectCountries();
    }, 500);
  }

  ngOnChanges() {
    if (this.foncier !== '' && this.foncier !== undefined) {
      setTimeout(() => {
        this.fetchFc();
      }, 200);
    }
  }


  fetchFc() {
    // this.removeAllAmenagement();

    this.foncierForm.patchValue({
      proprietaire: this.foncier.proprietaire,
      type_foncier: this.foncier.type_foncier,
      adresse: this.foncier.adresse,
      description: this.foncier.description,
      lieu: this.foncier.lieu,
      assure: this.foncier.assure,
      etat_du_bien: this.foncier.etat_du_bien,
      ville: this.foncier.ville,
      code_postal: this.foncier.code_postal,
      pays: this.foncier.pays,
      montant_loyer: this.foncier.montant_loyer,
      meuble_equipe: this.foncier.meuble_equipe,
    });


  }

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }
  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  

// selectCountries(){
//   this.foncierForm.patchValue({
//     pays: 'MA',
//   });
//   this.help.getCities('MA').subscribe(data => {
//         this.cities = data
//       })
// }


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

    this.foncierService.addFoncier(foncier, this.userMatricule).subscribe(
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

  updateFoncier() {
    let id = this.foncier._id

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

    this.foncierService.updateFoncier(id, foncier, this.userMatricule).subscribe(
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

  // Get Proprietaire With Lieux Ids from the server
  getPropWithLieux() {
    this.store.dispatch(getPropWithLieuxAction())
  }

  // Select Proprietaire ids
  getProprietaires() {
    this.proprietairesSubscription$ = this.store.select(getProprietaires).pipe(debounceTime(500)).subscribe(data => {
      if (data) this.proprietaires = data;
      if (!data) this.getPropWithLieux()
    });
  }

  // Select Lieux ids
  getLieux() {
    this.lieuxSubscription$ = this.store.select(getLieux).subscribe(data => {
      if (data) this.lieux = data;
      if (!data) this.getPropWithLieux()
    });
  }

   /////////////////// Get countries and cities  ////////////*

  //  fetchCountries() {
  //   this.store.dispatch(getCountriesAction())
  // }

  // getCountries() {
  //   this.countriesSubscription$ = this.store.select(getCountries).subscribe(data => {
  //     if (data) this.countries = data;
  //     if (data.length == 0) this.fetchCountries()
  //   });
  // }


  // getCities(event: any) {
  //   let isoCode: string = event.target.value

  //   this.help.getCities(isoCode)
  //   // .pipe(
  //   //   map((data: any) => {
  //   //     if (data.length > 20) {
  //   //      debounceTime(1000)
  //   //     }
  //   //   })
  //   // )
  //   .subscribe(data => {
  //     this.cities = data
  //   })
  // }

 ///////////////////////

  ngOnDestroy() {
    if (this.lieuxSubscription$) this.lieuxSubscription$.unsubscribe()
    if (this.proprietairesSubscription$) this.proprietairesSubscription$.unsubscribe()
    if (this.countriesSubscription$) this.countriesSubscription$.unsubscribe()
  }
}

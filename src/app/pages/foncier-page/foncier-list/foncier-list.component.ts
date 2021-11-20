import { HelperService } from './../../../services/helpers/helper.service';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { FoncierService } from '../../../services/foncier-service/foncier.service';
import { MainModalService } from './../../../services/main-modal/main-modal.service';
import { ConfirmationModalService } from './../../../services/confirmation-modal-service/confirmation-modal.service';
import { Foncier } from './../../../models/Foncier';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getFoncierAction } from '../foncier-store/foncier.actions';
import { getFonciers, getError } from '../foncier-store/foncier.selector';

@Component({
  selector: 'app-foncier-list',
  templateUrl: './foncier-list.component.html',
  styleUrls: ['./foncier-list.component.scss'],
})
export class FoncierListComponent implements OnInit {
  errors!: string;
  fonciers: Foncier[] = [
    {
      _id: 'any',
      proprietaire: [],
      type: 'DR',
      adresse: 'test',
      lieu: [],
      ville: 'rabat',
      desc_lieu_entrer: 'test',
      imgs_lieu_entrer: [
        {
          _id: 'test',
          image: 'test',
        },
      ],
      has_contrat: false,
      has_amenagements: true,
      superficie: '35',
      etage: '55',
      amenagement: [
        {
          _id: 'testid',
          idm: 'testidm',
          nature_amenagement: 'test',
          montant_amenagement: '74673',
          valeur_nature_chargeProprietaire: 'test',
          valeur_nature_chargeFondation: 'test',
          numero_facture: '3535642',
          numero_bon_commande: '454254',
          date_passation_commande: new Date('22-03-2021'),
          evaluation_fournisseur: 'test',
          date_fin_travaux: new Date('22-03-2021'),
          date_livraison_local: new Date('22-03-2021'),
          deleted: false,
          images_apres_travaux: [],
          croquis_travaux: [],
          fournisseur: [
            {
              nom: 'ahmad',
              prenom: 'ahmad',
              amenagement_effectue: 'test',
              deleted: false,
            },
          ],
        },
        // {
        //   _id: 'testid2',
        //   idm: 'testidm2',
        //   nature_amenagement: 'test2',
        //   montant_amenagement: '74673e',
        //   valeur_nature_chargeProprietaire: 'test2',
        //   valeur_nature_chargeFondation: 'test2',
        //   numero_facture: '3535642e',
        //   numero_bon_commande: '454254',
        //   date_passation_commande: new Date('22-03-2021'),
        //   evaluation_fournisseur: 'test',
        //   date_fin_travaux: new Date('22-03-2021'),
        //   date_livraison_local: new Date('22-03-2021'),
        //   deleted: false,
        //   images_apres_travaux: [],
        //   croquis_travaux: [],
        //   fournisseur: [
        //     {
        //       nom: 'ahmad',
        //       prenom: 'ahmad',
        //       amenagement_effectue: 'test',
        //       deleted: false,
        //     },
        //   ],
        // }
      ],
    },
    {
      _id: 'any',
      proprietaire: [],
      type: 'LF',
      adresse: 'test',
      lieu: [],
      ville: 'casa',
      desc_lieu_entrer: 'test',
      imgs_lieu_entrer: [
        {
          _id: 'test',
          image: 'test',
        },
      ],
      has_contrat: true,
      has_amenagements: false,
      superficie: '22',
      etage: '4',
      amenagement: [
        {
          _id: 'testid',
          idm: 'testidm',
          nature_amenagement: 'test',
          montant_amenagement: '74673',
          valeur_nature_chargeProprietaire: 'test',
          valeur_nature_chargeFondation: 'test',
          numero_facture: '3535642',
          numero_bon_commande: '454254',
          date_passation_commande: new Date('22-03-2021'),
          evaluation_fournisseur: 'test',
          date_fin_travaux: new Date('22-03-2021'),
          date_livraison_local: new Date('22-03-2021'),
          deleted: true,
          images_apres_travaux: [],
          croquis_travaux: [],
          fournisseur: [
            {
              nom: 'ahmad',
              prenom: 'ahmad',
              amenagement_effectue: 'test',
              deleted: true,
            },
          ],
        },
      ],
    },
  ];

  filtredFonciers: Foncier[] = [];
  id: string = '0';
  targetFoncier!: Foncier;
  foncierSubscription$!: Subscription;
  findFoncier!: string;
  deletedFoncier!: Foncier;

  // Pagination options
  listFoncierPage: number = 1;
  count: number = 0;
  tableSize: number = 10;

  //Delete succes message
  deleteDone: boolean = false;
  deleteSucces: string = 'Localex supprimé avec succés';

  userMatricule: any = localStorage.getItem('matricule');
  accessError!: any;

  constructor(
    private foncierService: FoncierService,
    private helperService: HelperService,
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.getFoncier();

    // Check error
    this.store.select(getError).subscribe((data) => {
      if (data) this.accessError = data;
    });
  }

  getFoncier() {
    // Select foncier from store
    this.foncierSubscription$ = this.store
      .select(getFonciers)
      .subscribe((data) => {
        // Check if foncier data is empty then fetch it from server
        if (data.length === 0) {
          // Dispatch action to handle the NgRx get foncier from server effect
          this.store.dispatch(getFoncierAction());
        }
        // this.fonciers = data;
      });
  }

  checkAndPutText(value: boolean | undefined) {
    return this.helperService.booleanToText(value)
  }

  // Filter by intitule
  search() {
    if (this.findFoncier != '') {
      this.fonciers = this.fonciers.filter((res: any) => {
        return (
          res.type_foncier
            ?.toLowerCase()
            .match(this.findFoncier.toLowerCase()) ||
          res.ville?.toLowerCase().match(this.findFoncier.toLowerCase())
        );
      });
    } else if (this.findFoncier == '') {
      this.getFoncier();
    }
  }

  searchByAmenagement(event: any, statut: string) {
    this.getFoncier();

    if (event.target.checked) {
      if (statut == 'all') {
        return this.fonciers;
      }

      if (statut != 'all') {
        this.filtredFonciers = this.fonciers.filter((res) => {
          return res.has_amenagements?.toString().match(statut);
        });
        this.fonciers = this.filtredFonciers;
      }
    }

    return;
  }

  openEditModal(SelectedFoncier: any) {
    this.mainModalService.open();
    this.targetFoncier = SelectedFoncier;
  }

  openConfirmationModal(Foncier: any) {
    // this.id = id;
    this.confirmationModalService.open(); // Open delete confirmation modal
    this.deletedFoncier = Foncier;
  }

  // Close confirmation modal
  closeConfirmationModal() {
    this.confirmationModalService.close(); // Close delete confirmation modal
  }

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }
  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  // Delete fonfier
  deleteFoncier() {
    this.foncierService
      .deleteFoncier(
        this.deletedFoncier._id,
        { deleted: true },
        this.userMatricule
      )
      .subscribe(
        (_) => {
          this.store.dispatch(getFoncierAction());
          this.confirmationModalService.close();
          this.deleteDone = true;
          setTimeout(() => {
            this.deleteDone = false;
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
  openModalAndPushFoncier(foncier: any) {
    this.targetFoncier = foncier;
    this.mainModalService.open(); // Open delete confirmation modal
  }
  reload() {
    this.helperService.refrechPage();
  }
}

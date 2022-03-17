import { HelperService } from './../../../services/helpers/helper.service';
import { ConfirmationModalService } from '../../../services/confirmation-modal-service/confirmation-modal.service';
import { MainModalService } from '../../../services/main-modal/main-modal.service';
import { Proprietaire } from '../../../models/Proprietaire';
import { Component, OnInit } from '@angular/core';
import { ProprietaireService } from 'src/app/services/proprietaire-service/proprietaire.service';
import { ContratService } from '@services/contrat-service/contrat.service';

@Component({
  selector: 'app-list-proprietaire',
  templateUrl: './list-proprietaire.component.html',
  styleUrls: ['./list-proprietaire.component.scss'],
})

export class ListProprietaireComponent implements OnInit {
  proprietaires: any[] = [];
  targetProprietaire: Proprietaire[] = [];
  targetProprietaireId: string = '';
  findProprietaire!: string;
  errors!: string;
  accessError!: string;

  //Delete succes message
  deleteDone: boolean = false;
  deleteSucces: string = 'Proprietaire supprimé avec succés';

  // Pagination options
  listProprietairePage: number = 1;
  count: number = 0;
  tableSize: number = 10;

  userMatricule: any = localStorage.getItem('matricule');

  id: string = 'DeleteConfirmation';

  fonciers!: any;

  constructor(
    private contratService: ContratService,
    private proprietaireService: ProprietaireService,
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getAllFonciers();
    }, 1000); // Trow the fitching data
  }

  // ngOnChanges() {
  //   this.getAllProprietaires(); // Trow the fitching data if anything changes
  // }

  // Get data from proprietaire service
  // getAllProprietaires() {
  //   this.proprietaireService.getProprietaire(this.userMatricule).subscribe((data) => {
  //     this.foncier = data;
  //     this.proprietaires = this.foncier[0].foncier.proprietaire
  //   }, error => {
  //     this.accessError = error.error.message
  //   });
  // }

  // Filter by intitule
  search() {
    if (this.findProprietaire != '') {
      this.proprietaires = this.proprietaires.filter((res) => {
        return res.cin
          ?.toLowerCase()
          .match(this.findProprietaire.toLowerCase());
        // res.passport?.toLowerCase().match(this.findProprietaire.toLowerCase()) ||
        // res.carte_sejour?.toLowerCase().match(this.findProprietaire.toLowerCase()) ||
        // res.nom_prenom?.toLowerCase().match(this.findProprietaire.toLowerCase())
      });
    } else if (this.findProprietaire == '') {
      this.getAllFonciers();
    }
  }

  // Get data from proprietaire service
  getAllFonciers() {
    this.proprietaireService.getProprietaire(this.userMatricule).subscribe(
      (data) => {
        this.fonciers = data;
        this.collectProprietaireData();
      },
      (error) => {
        this.accessError = error.error.message;
      }
    );
  }

  collectProprietaireData() {
    this.fonciers?.forEach((foncier: any) => {
      foncier?.lieu?.forEach((lieu: any) => {
        if (!lieu.deleted) {
          foncier?.proprietaire.forEach((proprietaire: any) => {
            proprietaire.numero_contrat = foncier?.contrat?.numero_contrat || '--';
            proprietaire.intitule_lieu = lieu.lieu.intitule_lieu || '--';
            proprietaire.type_lieu = foncier.type_lieu || '--';
            this.proprietaires.push(proprietaire);
          });
        }
      });
    });
    this.sortProprietaireList();
    // console.log(this.proprietaires);
  }
  
  // Sort proprietaire list by its updated date
  sortProprietaireList() {
    this.proprietaires.sort((a: any,b: any) => (
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      // b._id - a._id
      // (new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      ))
      console.log(this.proprietaires);
  }

  // Open the update proprietaire form and push index and data of proprietaire
  openModalAndPushProprietaire(myTargetProprietaire: any) {
    this.mainModalService.open(); // Open the update proprietaire form
    this.targetProprietaire = myTargetProprietaire; // Push proprietaire data
  }

  checkAndPutText(value: boolean) {
    return this.helperService.booleanToText(value);
  }

  // Open confirmation modal
  openDeleteConfirmationModal() {
    this.confirmationModalService.open(this.id); // Open delete confirmation modal
  }

  // Close confirmation modal
  closeDeleteConfirmationModal() {
    this.confirmationModalService.close(this.id); // Close delete confirmation modal
  }

  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  // Delete proprietaire
  deleteProprietaire(id: string) {
    let data = {
      deleted: true,
    };
    // Call detele proprietaire function from proprietaire service
    this.proprietaireService
      .deleteProprietaire(id, data, this.userMatricule)
      .subscribe(
        (_) => {
          this.getAllFonciers(); // Trow the fitching data
          this.closeDeleteConfirmationModal();
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

  // Get id of selected proprietaire
  getProprietaireId(id: any) {
    this.targetProprietaireId = id;
  }

  // Refrtech the page
  refrechPage() {
    this.helperService.refrechPage();
  }
}

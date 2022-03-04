import { Component, OnInit } from '@angular/core';
import { ClotureService } from '@services/cloture/cloture.service';
import { ConfirmationModalService } from '@services/confirmation-modal-service/confirmation-modal.service';
import { DownloadService } from '@services/download-service/download.service';
import { HelperService } from '@services/helpers/helper.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-situation-cloture',
  templateUrl: './situation-cloture.component.html',
  styleUrls: ['./situation-cloture.component.scss'],
})
export class SituationClotureComponent implements OnInit {
  situations = ['état_virements', 'état_taxes'];
  url: string = environment.API_URL_WITHOUT_PARAM;
  generationDone: boolean = false;
  generationSucces: string = 'Calcule des totaux fait avec succés';
  errors!: string;
  userMatricule: any = localStorage.getItem('matricule');
  situationClotureDetails!: any;
  isCloture: boolean = false;
  showClotureSection: boolean = false;
  twelveHours: number = 1000 * 60 * 60 * 12;
  dateCloture!: any;
  hasNextCluture: boolean = false;
  today!: any;


  constructor(
    private help: HelperService,
    private clotureService: ClotureService,
    private confirmationModalService: ConfirmationModalService,
    private downloadService: DownloadService,
  ) {}

  ngOnInit(): void {
    this.getSituationCloturePath(this.situations);    // Get next cloture date and check
    this.getNextClotureAndCheck();

    // Get the same function after 6 hours
    setInterval(() => {
      this.getNextClotureAndCheck();
    }, this.twelveHours);
  }

  generateSituationCloture() {
    // Get date of now
    let today = new Date();

    // Fill date cloture
    let date = {
      mois: today.getMonth() + 1,
      annee: today.getFullYear(),
    };

    this.clotureService.situationCloture(date, this.userMatricule).subscribe(
      (_) => {
        this.generationDone = true;
        setTimeout(() => {
          this.generationDone = false;
          this.help.refrechPage();
        }, 2000);
      },
      (error) => {
        this.errors = error.error.message;
        setTimeout(() => {
          this.showErrorMessage();
        }, 2000);
        this.hideErrorMessage();
      }
    );
  }

  getSituationCloturePath(data: any) {
    // Get date of now
    let today = new Date();
    // Fill date cloture
    let date = {
      mois: today.getMonth() + 1,
      annee: today.getFullYear(),
    };

    this.clotureService
      .getPathSituationCloture(date.mois, date.annee, data)
      .subscribe((data) => {
        this.situationClotureDetails = data.responsedData[0];
      });
  }

    // Get the next cloture date from the server and check if has data and throw the check function
    getNextClotureAndCheck() {
      this.help.getNextClotureDate().subscribe((date) => {
        this.dateCloture = date;
        if (this.dateCloture.annee && this.dateCloture.mois)
          this.hasNextCluture = true;
        this.checkNextCloture();
      });
    }

    // Check the next cloture
    checkNextCloture() {
      let today: Date = new Date();
  
      // Check if the next cloture's here
      if (this.hasNextCluture) {
        // Put this month is cloture and show cloture section if next cloture match with today
        if (
          this.dateCloture.annee == today.getFullYear() &&
          this.dateCloture.mois == today.getMonth() + 1
        )
          return [
            (this.today = today),
            (this.isCloture = false),
            (this.showClotureSection = true),
          ];
        else return [(this.isCloture = true), (this.showClotureSection = true)];
      } else return (this.showClotureSection = false);
    }

    
  // Cloture this month
  cloture() {
    // Get date of now
    let today = new Date();

    // Fill date cloture
    let date = {
      mois: today.getMonth() + 1,
      annee: today.getFullYear(),
    };

    // Throw cloture function from cloture service
    this.clotureService.Cloture(date, this.userMatricule).subscribe((data) => {
      if (data) this.isCloture = true;
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

    // Open confirmation modal
    openConfirmationModal() {
      this.confirmationModalService.open(); // Open delete confirmation modal
    }
  
    // Close confirmation modal
    closeConfirmationModal() {
      this.confirmationModalService.close(); // Close delete confirmation modal
    }
}

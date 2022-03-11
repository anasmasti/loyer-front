import { Component, OnInit } from '@angular/core';
import { ClotureService } from '@services/cloture/cloture.service';
import { DownloadService } from '@services/download-service/download.service';
import { HelperService } from '@services/helpers/helper.service';
import { environment } from 'src/environments/environment';
import dateClotureType from '../cloture/date-cloture.type';

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
  today!: any;
  fileObjects: any = [{ état_des_virements: '0' }, { état_des_taxes: '1' }];
  fileNames: [string, string] = ['état_des_virements', 'état_des_taxes'];
  dateCloture!: dateClotureType;

  constructor(
    private help: HelperService,
    private clotureService: ClotureService,
    private downloadService: DownloadService
  ) {}

  ngOnInit(): void {
    this.getSituationCloturePath(this.situations); // Get next cloture date and check
    this.getNextClotureAndCheck();
  }

  // Get the next cloture date from the server and check if has data and throw the check function
  getNextClotureAndCheck() {
    this.help.getNextClotureDate().subscribe((date: dateClotureType) => {
      this.dateCloture = date;
    });
  }

  generateSituationCloture() {
    // Fill date cloture
    let date: dateClotureType = {
      mois: this.dateCloture.mois,
      annee: this.dateCloture.annee,
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
        this.situationClotureDetails = data[0];
      });
  }

  downloadExcelFiles(fileName: string) {
    this.downloadService.dowloadExcelFiles(fileName).catch(console.error);
  }

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }
}

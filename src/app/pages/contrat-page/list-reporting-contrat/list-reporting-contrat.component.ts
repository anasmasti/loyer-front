import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { ReportingService } from 'src/app/services/reporting/reporting.service';
import { SearchServiceService } from 'src/app/services/search-service/search-service.service';

@Component({
  selector: 'app-list-reporting-contrat',
  templateUrl: './list-reporting-contrat.component.html',
  styleUrls: ['./list-reporting-contrat.component.scss'],
})
export class ListReportingContratComponent implements OnInit {
  dateList!: any[];
  findDate!: string;
  reportings!: any;
  userMatricule: any = localStorage.getItem('matricule');
  accessError!: any;
  errors!: string;

  // Pagination options
  listReportingContratPage: number = 1;
  count: number = 0;
  tableSize: number = 4;

  url: string = environment.API_URL_WITHOUT_PARAM;

  constructor(
    private reportingService: ReportingService,
    private helpService: HelperService,
    private searchService: SearchServiceService
  ) {}

  ngOnInit(): void {
    this.getReportings();
    this.fillMounths();
  }

  fillMounths() {
    this.dateList = this.helpService.getMounths();
  }

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  generatContratReportings() {
    let data;

    this.reportingService
      .generateReportings(this.userMatricule, data, 'contrat')
      .subscribe();
  }

  getReportings() {
    this.reportingService.getReportings('contrat').subscribe(
      (data) => {
        this.reportings = data;
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

  search(type: string) {
    let isAnnee: boolean;

    if (type == 'annee') isAnnee = true;

    if (this.findDate != '') {
      this.searchService.mainSearch(
        (this.reportings = this.reportings.filter((res: any) => {
          if (isAnnee) {
            return res.annee
              ?.toString()
              ?.toLowerCase()
              .match(this.findDate.toLowerCase());
          } else {
            return res.mois
              ?.toString()
              ?.toLowerCase()
              .match(this.findDate.toLowerCase());
          }
        }))
      );
    } else if (this.findDate == '') {
      // this.getContrat();
    }
  }
}

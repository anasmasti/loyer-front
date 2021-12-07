import { HelperService } from 'src/app/services/helpers/helper.service';
import { SearchServiceService } from 'src/app/services/search-service/search-service.service';
import { environment } from 'src/environments/environment';
import { ReportingService } from './../../../services/reporting/reporting.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'reporting-lieux',
  templateUrl: './list-reporting-lieux.component.html',
  styleUrls: ['./list-reporting-lieux.component.scss'],
})
export class ListReportingLieuxComponent implements OnInit {
  // Pagination options
  listReportingPage: number = 1;
  count: number = 0;
  tableSize: number = 10;
  findDate!: string;
  dateList!: any[];

  userMatricule: any = localStorage.getItem('matricule');
  accessError!: any;
  errors!: string;
  reportings!: any[];
  findReporting!: any;

  url: string = environment.API_URL_WITHOUT_PARAM;

  lieux = [
    {
      id: 'DR',
      name: 'Direction régionale',
    },
    {
      id: 'LF',
      name: 'Logement de fonction',
    },
    {
      id: 'PV',
      name: 'Point de vente',
    },
    {
      id: 'Siege',
      name: 'Siège',
    },
    {
      id: 'SV',
      name: 'Supervision',
    },
  ];

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

  getReportings() {
    this.reportingService.getReportings('lieux').subscribe(
      (data) => {
        this.reportings = data;
      },
      (error) => {
        this.errors = error.error;
        setTimeout(() => {
          this.showErrorMessage();
        }, 3000);
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
      this.getReportings();
    }
  }

  generateReportingsLieux(lieu: string) {
    this.reportingService
      .generateReportings(this.userMatricule, 'hrfh', lieu)
      .subscribe(
        (_) => {},
        (error) => {
          this.errors = error.error.message;
          setTimeout(() => {
            this.showErrorMessage();
          }, 2000);
          this.hideErrorMessage();
        }
      );
  }
}

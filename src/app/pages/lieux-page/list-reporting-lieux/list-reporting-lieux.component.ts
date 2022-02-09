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
  foundedDate!: string;
  dateList!: any[];

  userMatricule: any = localStorage.getItem('matricule');
  accessError!: any;
  errors!: string;
  reportings!: any[];
  findReporting!: any;
  reportingsClone!: any;

  url: string = environment.API_URL_WITHOUT_PARAM;
  generationDone: boolean = false;
  generationSucces: string = 'Reporting généré avec succés';

  lieux = [
    {
      id: 'DR',
      name: 'Direction régionale',
      data: 'directions_régionales'
    },
    {
      id: 'LF',
      name: 'Logement de fonction',
      data: 'logements_de_fonction'
    },
    {
      id: 'PV',
      name: 'Point de vente',
      data: 'points_de_vente'
    },
    {
      id: 'Siege',
      name: 'Siège',
      data: 'siège'
    },
    {
      id: 'SV',
      name: 'Supervision',
      data: 'supervisions'
    },
  ];

  lieuxList =  [
    "siège",
    "points_de_vente",
    "supervisions",
    "directions_régionales",
    "logements_de_fonction"
  ] 

  constructor(
    private reportingService: ReportingService,
    private helpService: HelperService,
    private searchService: SearchServiceService,
    private help:HelperService
  ) {}

  ngOnInit(): void {
    // this.lieux.forEach(lieu => {
      this.getReportings('reporting/all',this.lieuxList);
    // })
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

  getReportings(route: string, data: any) { 
    this.reportingService.getReportings(route, data).subscribe(
      (data) => {
        this.reportingsClone = data;
        this.reportings = this.reportingsClone;
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

  search(date: any) {
    let splitedDate = date.split('-');
    if (splitedDate[0] != '') {
      this.reportings = this.reportingsClone.filter((res: any) => {
        return res.annee == splitedDate[0] && res.mois == splitedDate[1];
      });
    } else if (splitedDate[0] == '') {
      this.getReportings('reporting/all', this.lieuxList);
    }
  }

  generateReportingsLieux(lieu: string) {
    this.reportingService
      .generateReportings(lieu)
      .subscribe(
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
}

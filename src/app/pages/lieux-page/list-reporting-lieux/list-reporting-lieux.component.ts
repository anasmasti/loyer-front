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
    private searchService: SearchServiceService
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
        this.reportings = data;
        console.log("tist",data);
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
      this.lieux.forEach(lieu => {
        this.getReportings(lieu.id,lieu.data);
      })
    }
  }

  generateReportingsLieux(lieu: string) {
    this.reportingService
      .generateReportings(lieu)
      .subscribe(
        (data) => {console.log("======",data);
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

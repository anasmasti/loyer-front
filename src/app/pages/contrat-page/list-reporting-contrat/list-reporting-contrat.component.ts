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
  data!: any;
  dateList!: any[];
  findDate!: string;
  reportings!: any;
  userMatricule: any = localStorage.getItem('matricule');

   // Pagination options
   listReportingContratPage: number = 1;
   count: number = 0;
   tableSize: number = 4;
  constructor(
    private reportingService: ReportingService,
    private helpService: HelperService,
    private searchService: SearchServiceService
  ) {}

  ngOnInit(): void {
    this.dateList = this.helpService.getMounths();
    console.log(this.dateList);
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
    this.reportingService
      .generateReportings(this.userMatricule, this.data, 'contrat')
      .subscribe();
  }

  downloadContratReporting() {
    this.reportingService.downloadContratReporting();
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

import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { ReportingService } from 'src/app/services/reporting/reporting.service';
import { SearchServiceService } from 'src/app/services/search-service/search-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-reporting-foncier',
  templateUrl: './list-reporting-foncier.component.html',
  styleUrls: ['./list-reporting-foncier.component.scss'],
})
export class ListReportingFoncierComponent implements OnInit {
  dateList!: any[];
  foundedDate!: string;
  filtredReporting!: any;
  reportings!: any;
  userMatricule: any = localStorage.getItem('matricule');
  accessError!: any;
  errors!: string;

  // Pagination options
  listReportingFoncierPage: number = 1;
  listReportingAmenagementPage: number = 1;
  count: number = 0;
  tableSize: number = 4;
  reportingsClone!: any;

  url: string = environment.API_URL_WITHOUT_PARAM;

  foncierList = ['aménagements_réalisés', 'locaux_fermés'];
  generationDone: boolean = false;
  generationSucces: string = 'Reporting généré avec succés';

  constructor(
    private reportingService: ReportingService,
    private helpService: HelperService,
    private searchService: SearchServiceService,
    private help:HelperService
  ) {}

  ngOnInit(): void {
    this.getReportings('reporting/all', this.foncierList);
    // this.getReportings('reporting/all',this.foncierList);
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

  generatFoncierReportings(type: string) {
    this.reportingService.generateReportings(type).subscribe(
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

  getReportings(route: string, data: any) {
    this.reportingService.getReportings(route, data).subscribe(
      (data) => {
        this.reportingsClone = data;
        this.reportings = this.reportingsClone;
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

  search(date: any) {
    let splitedDate = date.split('-');
    if (splitedDate[0] !== '') {
      this.reportings = this.reportingsClone.filter((res: any) => {
        return res.annee === splitedDate[0] && res.mois === splitedDate[1];
      });
    } else if (splitedDate[0] === '') {
      this.getReportings('reporting/all', this.foncierList);
    }
  }

  }


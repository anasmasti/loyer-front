import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { ReportingService } from 'src/app/services/reporting/reporting.service';
import { SearchServiceService } from 'src/app/services/search-service/search-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators';
import { from, fromEvent, throwError } from 'rxjs';

@Component({
  selector: 'app-list-reporting-contrat',
  templateUrl: './list-reporting-contrat.component.html',
  styleUrls: ['./list-reporting-contrat.component.scss'],
})
export class ListReportingContratComponent implements OnInit {
  dateList!: any[];
  foundedDate!: string;
  reportings!: any;
  userMatricule: any = localStorage.getItem('matricule');
  accessError!: any;
  errors!: string;

  // Pagination options
  listReportingCautiontPage: number = 1;
  listReportingContratEcheancePage: number = 1;
  count: number = 0;
  tableSize: number = 4;

  url: string = environment.API_URL_WITHOUT_PARAM;

  contratList = ['cautions_en_cours', 'échéances_de_contrats'];
  dateForm: any;
  reportingsClone!: any;

  generationDone: boolean = false;
  generationSucces: string = 'Reporting généré avec succés';

  constructor(
    private reportingService: ReportingService,
    private helpService: HelperService,
    private searchService: SearchServiceService,
    private help:HelperService
  ) {}

  ngOnInit(): void {
    this.dateForm = new FormGroup({
      date_search: new FormControl(''),
    });
    this.getReportings('reporting/all', this.contratList);
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

  generatContratReportings(type: string) {
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
    
    if (splitedDate[0] != '') {
      this.reportings = this.reportingsClone.filter((res: any) => {
        return res.annee == splitedDate[0] && res.mois == splitedDate[1];
      });
    } else if (splitedDate[0] == '') {
      this.getReportings('reporting/all', this.contratList);
    }
  }
}

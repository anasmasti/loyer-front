import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { ReportingService } from 'src/app/services/reporting/reporting.service';
import { SearchServiceService } from 'src/app/services/search-service/search-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-reporting-foncier',
  templateUrl: './list-reporting-foncier.component.html',
  styleUrls: ['./list-reporting-foncier.component.scss']
})
export class ListReportingFoncierComponent implements OnInit {

  dateList!: any[];
  findDate!: string;
  reportings!: any;
  userMatricule: any = localStorage.getItem('matricule');
  accessError!: any;
  errors!: string;

  // Pagination options
  listReportingFoncierPage: number = 1;
  listReportingAmenagementPage: number = 1;
  count: number = 0;
  tableSize: number = 4;

  url: string = environment.API_URL_WITHOUT_PARAM;

  foncierList =  [
    "amenagements_realises",
    "locaux_fermes"
  ] 


  constructor(
    private reportingService: ReportingService,
    private helpService: HelperService,
    private searchService: SearchServiceService
  ) {}

  ngOnInit(): void {
    this.getReportings('reporting/all',this.foncierList);
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
    this.reportingService
      .generateReportings(type)
      .subscribe(
        (data) => {
          console.log(data);
          this.reportings = data
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
    console.log(data);
    
    this.reportingService.getReportings(route, data).subscribe(
      (data) => {
        this.reportings = data;
        console.log(data);
        
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
      this.getReportings('reporting/all',this.foncierList);
      // this.getReportings('reporting/all',this.foncierList);
    }
  }

}

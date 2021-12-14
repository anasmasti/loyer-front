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
  findAnnee!: string;
  findMois!: string;
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

  url: string = environment.API_URL_WITHOUT_PARAM;

  foncierList = ['amenagements_realises', 'locaux_fermes'];

  constructor(
    private reportingService: ReportingService,
    private helpService: HelperService,
    private searchService: SearchServiceService
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
      (data) => {
        console.log(data);
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

  searchByYear(type: string) {
    let isAnnee: boolean;

    if (type == 'annee') isAnnee = true;

    if (this.findAnnee != '') {
      this.searchService.mainSearch(
        (this.reportings = this.reportings.filter((res: any) => {
          if (isAnnee) {
            console.log('annee', this.findAnnee);

            return res.annee
              ?.toString()
              ?.toLowerCase()
              .match(this.findAnnee.toLowerCase());
          }
        }))
      );
    } else if (this.findAnnee == '') {
      this.getReportings('reporting/all', this.foncierList);
      // this.getReportings('reporting/all',this.foncierList);
    }
  }

  async searchByMonth(type: string) {
    // let isMonth: boolean;

    // console.log("teeeeeeeest");

    // // if (type == 'mois') isMonth = true;
    // // this.getReportings('reporting/all',this.foncierList);
    // console.log("tttttttttttt" , this.reportings);

    // if (this.findMois != '') {
    //   this.searchService.mainSearch(
    //     (this.filtredReporting = this.reportings.filter((res: any) => {
    //       //  if (isMonth) {
    //         res.mois
    //         ?.toString()
    //         // ?.toLowerCase()
    //         .match(this.findMois.toString());
    //         // }

    //         console.log("mois",this.findMois.toLowerCase());
    //     }))
    //   );
    //   this.reportings = this.filtredReporting;

    //   console.log(this.filtredReporting);

    // }

    // else if (this.findMois == '') {
    //   this.getReportings('reporting/all',this.foncierList);
    //   // this.getReportings('reporting/all',this.foncierList);
    // }
    let isAnnee: boolean;
    let result: any = ['test' , 'xsxsx' ,'sxdsxsx']
    this.reportings= []
    await this.getReportings('reporting/all', this.foncierList);
    // if (type == 'mois') isAnnee = true;
    
    // if (this.reportings != []) {
    setTimeout(() => {
      this.searchService.mainSearch(
        (this.reportings = this.reportings.filter((res: any) => {
          // if (isAnnee) {
            console.log("Teeeets" , res);
            res.map((element:any) => {
              if (element.mois == this.findMois) {
                result.push(element)
              } 
            });
            
            return result
          // }
        }))
      );
    }, 1000);
      // }
    console.log(this.reportings);

    // }
    // else
    // if (this.reportings == []) {
    //   console.log("TREEEEEEEEEST");

    //   // this.getReportings('reporting/all',this.foncierList);
    // }
  }
}

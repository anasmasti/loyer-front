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

  constructor(private reportingService: ReportingService) {}

  ngOnInit(): void {
    this.getReportings();
  }

  getReportings() {
    this.reportingService.getReportings('lieux').subscribe((data) => {
      this.reportings = data;
    });
  }

  search() {
    if (this.findReporting != '') {
      this.reportings = this.reportings.filter((res: any) => {
        return (
          res.date?.toLowerCase().match(this.findReporting.toLowerCase()) ||
          res.date?.toLowerCase().match(this.findReporting.toLowerCase())
        );
      });
    } else if (this.findReporting == '') {
      this.getReportingLieuxList();
    }
  }

  getReportingLieuxList() {
    throw new Error('Method not implemented.');
  }

  generateReportingsLieux(lieu: string) {
    this.reportingService.generateReportings(this.userMatricule, 'hrfh', lieu);
  }
}

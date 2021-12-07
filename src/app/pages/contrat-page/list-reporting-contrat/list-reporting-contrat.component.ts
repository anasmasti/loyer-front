import { Component, Input, OnInit } from '@angular/core';
import { ReportingService } from 'src/app/services/reporting/reporting.service';

@Component({
  selector: 'app-list-reporting-contrat',
  templateUrl: './list-reporting-contrat.component.html',
  styleUrls: ['./list-reporting-contrat.component.scss']
})
export class ListReportingContratComponent implements OnInit {

   data!: any;
   userMatricule: any = localStorage.getItem('matricule');
  constructor(private reportingService: ReportingService) { }

  ngOnInit(): void {
  }

   // Afficher le message d'erreur de serveur
   showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  generatContratReportings(){
    this.reportingService.generateReportings(this.userMatricule,this.data,'contrat').subscribe()
  }

  downloadContratReporting(){
    this.reportingService.downloadContratReporting()
  }

}

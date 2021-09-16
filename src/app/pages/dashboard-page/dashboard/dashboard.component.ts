import { getAllCounts } from './../../../store/shared/shared.selector';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllCountsAction } from 'src/app/store/shared/shared.action';
import { ScaleType } from '@swimlane/ngx-charts';
import { DownloadService } from 'src/app/services/download-service/download.service';
import * as fileSaver from 'file-saver';
import { ChartsService } from 'src/app/services/charts/charts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store<AppState>, private downloadService: DownloadService, private chartService: ChartsService) { }

  allCount!: any;
  allCountSubscription$!: Subscription

  // Legend options
  hasLegend: boolean = true
  legendTitle: any = 'Horizontal statistiques';
  legendPositionRight: any = 'right';
  legendPositionBelow: any = 'below';

  // Axis options
  xAxis: boolean = false;
  yAxis: boolean = true;
  yAxisLabel: string = 'Vue globale';
  xAxisLabel: string = 'Vue globale';
  showXAxisLabel: boolean = false;
  showYAxisLabel: boolean = true;

  // Ticks options
  maxXAxisTickLength: number = 16;
  maxYAxisTickLength: number = 16;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;

  // Color options
  gradient: boolean = false;
  colorScheme = {
    domain: ['#f9a11e', '#ffbb56', '#e25e2c', "#ff9a73"]
  };
  schemeType: any = 'ordinal'; // 'ordinal' or 'linear'

  // Other options
  animations: boolean = true; // animations on load
  showGridLines: boolean = false; // grid lines
  showDataLabel: boolean = false; // numbers on bars
  barPadding: number = 5
  tooltipDisabled: boolean = false;
  yScaleMax: number = 9000;
  roundEdges: boolean = false;

  statisticsLine!: any 
  statisticsBar!: any 
  statisticsCircle!: any

  ngOnInit(): void {
    this.getAllCount()
    this.getChartBar()
    this.getChartCircl()
    this.getChartLine()
  }

  getAllCount() {
    // Select All Count from store
    this.allCountSubscription$ = this.store.select(getAllCounts).subscribe((data) => {
      // Check if All Count data is empty then fetch it from server
      if (data.length === 0) {
        // Dispatch action to handle the NgRx get All Count from server effect 
        this.store.dispatch(getAllCountsAction())
      }
      this.allCount = data
    })
  }

  ngOnDestroy() {
    this.allCountSubscription$.unsubscribe();
  }


  formatString(input: string): string {
    return input.toUpperCase()
  }

  formatNumber(input: number): number {
    return input
  }

  // --------------Start Download Files--------------
  downloadFichierComptable(){
    let today = new Date()
    let currentMonthName = today.toLocaleString('default', {month:'long'})
    let currentYear = today.getFullYear()
    let filename = 'FichierComptable ' + currentMonthName + ' ' + currentYear
    this.downloadService.dowloadFileComptableLoyer(filename).subscribe(res => {
      if(res){
        fileSaver.saveAs(res , filename);
      }
    })
  }
  // --------------End Download Files--------------

  getChartLine(){
    this.chartService.getChartLine().subscribe((data) => {
      this.statisticsLine = data;
    })
  }

  getChartCircl(){
    this.chartService.getChartCircl().subscribe((data) => {
      this.statisticsCircle = data
      
    })
  }

  getChartBar(){
    this.chartService.getChartBar().subscribe((data) => {
     this.statisticsBar = data
    })
  }

}

import { getAllCounts } from './../../../store/shared/shared.selector';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllCountsAction } from 'src/app/store/shared/shared.action';
import { ScaleType } from '@swimlane/ngx-charts';
import { DownloadService } from 'src/app/services/download-service/download.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store<AppState>, private downloadService: DownloadService) { }

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


  statistiquesLine = [
    {
      "name": "Saint Martin (French Part)",
      "series": [
        {
          "value": 3526,
          "name": "2016-09-15T11:01:03.684Z"
        },
        {
          "value": 3345,
          "name": "2016-09-12T20:53:53.530Z"
        },
        {
          "value": 5622,
          "name": "2016-09-15T07:02:37.783Z"
        },
        {
          "value": 2855,
          "name": "2016-09-13T00:56:01.382Z"
        },
        {
          "value": 2975,
          "name": "2016-09-17T13:01:34.527Z"
        }
      ]
    },
    {
      "name": "Uganda",
      "series": [
        {
          "value": 3055,
          "name": "2016-09-15T11:01:03.684Z"
        },
        {
          "value": 2610,
          "name": "2016-09-12T20:53:53.530Z"
        },
        {
          "value": 3654,
          "name": "2016-09-15T07:02:37.783Z"
        },
        {
          "value": 3930,
          "name": "2016-09-13T00:56:01.382Z"
        },
        {
          "value": 2347,
          "name": "2016-09-17T13:01:34.527Z"
        }
      ]
    },
    {
      "name": "Georgia",
      "series": [
        {
          "value": 2775,
          "name": "2016-09-15T11:01:03.684Z"
        },
        {
          "value": 5613,
          "name": "2016-09-12T20:53:53.530Z"
        },
        {
          "value": 6507,
          "name": "2016-09-15T07:02:37.783Z"
        },
        {
          "value": 2854,
          "name": "2016-09-13T00:56:01.382Z"
        },
        {
          "value": 3402,
          "name": "2016-09-17T13:01:34.527Z"
        }
      ]
    },
    {
      "name": "French Guiana",
      "series": [
        {
          "value": 4286,
          "name": "2016-09-15T11:01:03.684Z"
        },
        {
          "value": 4944,
          "name": "2016-09-12T20:53:53.530Z"
        },
        {
          "value": 2269,
          "name": "2016-09-15T07:02:37.783Z"
        },
        {
          "value": 3470,
          "name": "2016-09-13T00:56:01.382Z"
        },
        {
          "value": 5315,
          "name": "2016-09-17T13:01:34.527Z"
        }
      ]
    },
    {
      "name": "Malta",
      "series": [
        {
          "value": 6454,
          "name": "2016-09-15T11:01:03.684Z"
        },
        {
          "value": 5277,
          "name": "2016-09-12T20:53:53.530Z"
        },
        {
          "value": 3938,
          "name": "2016-09-15T07:02:37.783Z"
        },
        {
          "value": 4637,
          "name": "2016-09-13T00:56:01.382Z"
        },
        {
          "value": 3471,
          "name": "2016-09-17T13:01:34.527Z"
        }
      ]
    }
  ]

  statistiquesBar = [
    {
      "name": "Germany",
      "value": 40632,
     
    },
    {
      "name": "United States",
      "value": 50000,
    
    },
    {
      "name": "France",
      "value": 36745,
     
    },
    {
      "name": "United Kingdom",
      "value": 36240,
     
    },
    {
      "name": "Spain",
      "value": 33000,
     
    },
    {
      "name": "Western Sahara",
      "value": 59634
    },
    {
      "name": "Samoa",
      "value": 40342
    },
    {
      "name": "Puerto Rico",
      "value": 45330
    }
  ]

  ngOnInit(): void {
    this.getAllCount()
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
  returnBlob(res:any):Blob {
    return new Blob([res],{type:'application/xml'})
  }

  downloadAnnex1(filename:string){
    this.downloadService.dowloadFileAnnex1(filename).subscribe(res => {
      if(res){
        fileSaver.saveAs(res , filename);
      }
    })
  }

  downloadAnnex2(filename:string){
    this.downloadService.dowloadFileAnnex2(filename).subscribe(res => {
      if(res){
        fileSaver.saveAs(res , filename);
      }
    })
  }

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


}

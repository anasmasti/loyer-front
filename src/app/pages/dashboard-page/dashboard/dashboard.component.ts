import { HelperService } from 'src/app/services/helpers/helper.service';
import { getAllCounts } from './../../../store/shared/shared.selector';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllCountsAction } from 'src/app/store/shared/shared.action';
import { ChartsService } from 'src/app/services/charts/charts.service';
import { NotificationsService } from 'src/app/services/notifications-service/notifications.service';
import { Notif } from 'src/app/models/Notification';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  allCount!: any;
  allCountSubscription$!: Subscription;

  // View options
  view: [number, number] = [450, 900];
  HBarview: [number, number] = [400, 300];

  // Legend options
  hasLegend: boolean = true;
  villeTitle: any = 'Villes';
  locauxTitle: any = 'Locaux';
  contratTitle: any = 'Contrats';
  legendPositionRight: any = 'right';
  legendPositionBelow: any = 'below';

  // Axis options
  xAxis: boolean = false;
  yAxis: boolean = false;
  xAxisLabel: string = '';

  yAxisLabelBarH: string = 'Total des loyers par type du local';
  yAxisLabelBarV: string = 'Nombre des Point de ventes par direction régionale';
  yAxisLabelPie: string = 'Etats contrats';
  yAxisLabelAdvPie: string = 'Locaux statistiques';

  showXAxisLabel: boolean = false;
  showYAxisLabel: boolean = false;

  // Ticks options
  maxXAxisTickLength: number = 16;
  maxYAxisTickLength: number = 16;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;

  // Color options
  gradient: boolean = false;
  colorScheme = {
    domain: ['#f9a11e', '#ffbb56', '#e25e2c', '#ffdf3e', '#ff9a73', '#eb7e53'],
  };
  schemeType: any = 'ordinal'; // 'ordinal' or 'linear'

  // Other options
  animations: boolean = true; // animations on load
  showGridLines: boolean = false; // grid lines
  showDataLabel: boolean = false; // numbers on bars
  barPadding: number = 5;
  tooltipDisabled: boolean = false;
  yScaleMax: number = 9000;
  roundEdges: boolean = true;
  explodeSlices: boolean = true;

  statisticsBarV!: any;
  statisticsBarH!: any;
  statisticsCircle!: any;
  statisticsAdvancedCircl!: any;

  errorMessage!: string;
  serverConnected!: boolean;

  userMatricule: any = localStorage.getItem('matricule');
  notifications!: Notif[];
  notifErrorMessage!: string;
  notifHasError!: boolean;

  constructor(
    private store: Store<AppState>,
    private chartService: ChartsService,
    private help: HelperService,
    private notif: NotificationsService
  ) {}

  ngOnInit(): void {
    this.notifHasError = false;
    this.getAllCount();
    this.getChartBar();
    this.getChartCircl();
    this.getChartLine();
    this.getChartAdvancedCircl();
    this.putServerConnectivity();
    this.getNotifications();
  }

  getAllCount() {
    // Select All Count from store
    this.allCountSubscription$ = this.store
      .select(getAllCounts)
      .subscribe((data) => {
        // Check if All Count data is empty then fetch it from server
        if (data.length === 0) {
          // Dispatch action to handle the NgRx get All Count from server effect
          this.store.dispatch(getAllCountsAction());
        }
        this.allCount = data;
      });
  }

  ngOnDestroy() {
    this.allCountSubscription$.unsubscribe();
  }

  formatString(input: string): string {
    return input.toUpperCase();
  }

  formatNumber(input: number): number {
    return input;
  }

  // --------------End Download Files--------------

  getChartLine() {
    this.chartService.getChartBarH().subscribe((data) => {
      // this.statisticsBarH = data;
      this.statisticsBarH = [
        {
          name: 'Point de vente',
          value: 4000,
        },
        {
          name: 'Direction régionale',
          value: 2200,
        },
        {
          name: 'Logement de fonction',
          value: 5000,
        },
        {
          name: 'Siège',
          value: 3600,
        },
      ];
    });
  }

  getChartAdvancedCircl() {
    this.chartService.getChartAdvancedCircl().subscribe((data) => {
      this.statisticsAdvancedCircl = data;
    });
  }

  getChartCircl() {
    this.chartService.getChartCircl().subscribe((data) => {
      this.statisticsCircle = data;
    });
  }

  getChartBar() {
    this.chartService.getChartBarV().subscribe((data) => {
      // this.statisticsBarV = data;
      this.statisticsBarV = [
        {
          name: 'DR1',
          value: 40,
        },
        {
          name: 'DR10',
          value: 2,
        },
        {
          name: 'DR2',
          value: 50,
        },
        {
          name: 'DR3',
          value: 36,
        },
        {
          name: 'DR9',
          value: 8,
        },
        {
          name: 'DR4',
          value: 31,
        },
        {
          name: 'DR5',
          value: 33,
        },
        {
          name: 'DR6',
          value: 35,
        },
        {
          name: 'DR7',
          value: 25,
        },
        {
          name: 'DR8',
          value: 16,
        },
        {
          name: 'DR11',
          value: 20,
        },
      ];
    });
  }

  getNotifications() {
    this.notif.getLatestNotifications(this.userMatricule).subscribe(
      (notifs) => {
        if (notifs) this.notifications = notifs;
        if (!notifs) this.notifHasError = true;
      },
      (error) => {
        this.notifErrorMessage = error;
      }
    );
  }

  putServerConnectivity() {
    this.serverConnected = true;
    this.errorMessage = '';
    setTimeout(() => {
      this.help.checkServerConnectivity().subscribe(
        (data) => {
          if (data) this.serverConnected = true;
        },
        (_) => {
          this.serverConnected = false;
          this.errorMessage =
            'la connection au serveur a échoué, veuillez réessayer.';
        }
      );
    }, 1500);
  }
}

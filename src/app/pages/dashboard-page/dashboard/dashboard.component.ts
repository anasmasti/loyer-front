import { getAllCounts } from './../../../store/shared/shared.selector';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllCountsAction } from 'src/app/store/shared/shared.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  allCount!: any;
  allCountSubscription$!: Subscription

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


}

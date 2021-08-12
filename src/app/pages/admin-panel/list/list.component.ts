import { getUsers } from './../admin-store/admin.selector';
import { Subscription } from 'rxjs';
import { MainModalService } from './../../../services/main-modal/main-modal.service';
import { ConfirmationModalService } from './../../../services/confirmation-modal-service/confirmation-modal.service';
import { AppState } from 'src/app/store/app.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/User';
import { getUsersAction } from '../admin-store/admin.actions';
import { AdminService } from 'src/app/services/admin-service/admin.service';

@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  users!: User[];
  targetUser!: User;
  usersSubscription$!: Subscription;
  deletedUser: any = ''

  // Pagination options
  listUsersPage: number = 1;
  count: number = 0;
  tableSize: number = 4;

  constructor(
    private mainModalService: MainModalService,
    private confirmationModalService: ConfirmationModalService,
    private store: Store<AppState>,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    // Select users from store
    this.usersSubscription$ = this.store.select(getUsers).subscribe((data) => {
      // Check if users data is empty then fetch it from server
      if (data.length === 0) {
        // Dispatch action to handle the NgRx get users from server effect 
        this.store.dispatch(getUsersAction())
      }
      this.users = data

    })
  }


  openConfirmationModal(deleteduser : any) {
    this.deletedUser = deleteduser
    this.confirmationModalService.open(); // Open delete confirmation modal
  }

  openModalAndPushUser(user: any) {
    this.targetUser = user
    this.mainModalService.open(); // Open delete confirmation modal
  }

  // Close confirmation modal
  closeConfirmationModal() {
    this.confirmationModalService.close(); // Close delete confirmation modal
  }

  deleteUserR(){
    
    this.adminService.deleteUserById(this.deletedUser._id)
      .subscribe(
        (_) => {
          setTimeout(() => {
            this.store.dispatch(getUsersAction())
            this.confirmationModalService.close();
          }, 500);
        }
      );
    
  }
  

  ngOnDestroy() {
    this.usersSubscription$.unsubscribe()
  }

}

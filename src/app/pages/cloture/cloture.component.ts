import { Component, OnInit } from '@angular/core';
import { ClotureService } from '@services/cloture/cloture.service';
import { ConfirmationModalService } from '@services/confirmation-modal-service/confirmation-modal.service';
import { HelperService } from '@services/helpers/helper.service';

@Component({
  selector: 'app-cloture',
  templateUrl: './cloture.component.html',
  styleUrls: ['./cloture.component.scss']
})
export class ClotureComponent implements OnInit {

  isCloture: boolean = false;
  showClotureSection: boolean = false;
  twelveHours: number = 1000 * 60 * 60 * 12;
  dateCloture!: any;
  hasNextCluture: boolean = false;
  userMatricule: any = localStorage.getItem('matricule');
  today!: any;

  constructor(private help: HelperService,
    private clotureService: ClotureService,
    private confirmationModalService: ConfirmationModalService
    ) { }

  ngOnInit(): void {
    this.getNextClotureAndCheck();

    // Get the same function after 6 hours
    setInterval(() => {
      this.getNextClotureAndCheck();
    }, this.twelveHours);
  }

   // Get the next cloture date from the server and check if has data and throw the check function
   getNextClotureAndCheck() {
    this.help.getNextClotureDate().subscribe((date) => {
      this.dateCloture = date;
      if (this.dateCloture.annee && this.dateCloture.mois)
        this.hasNextCluture = true;
      this.checkNextCloture();
    });
  }

  // Check the next cloture
  checkNextCloture() {
    let today: Date = new Date();

    // Check if the next cloture's here
    if (this.hasNextCluture) {
      // Put this month is cloture and show cloture section if next cloture match with today
      if (
        this.dateCloture.annee == today.getFullYear() &&
        this.dateCloture.mois == today.getMonth() + 1
      )
        return [
          (this.today = today),
          (this.isCloture = false),
          (this.showClotureSection = true),
        ];
      else return [(this.isCloture = true), (this.showClotureSection = true)];
    } else return (this.showClotureSection = false);
  }

  
// Cloture this month
cloture() {
  // Get date of now
  let today = new Date();

  // Fill date cloture
  let date = {
    mois: today.getMonth() + 1,
    annee: today.getFullYear(),
  };

  // Throw cloture function from cloture service
  this.clotureService.Cloture(date, this.userMatricule).subscribe((data) => {
    if (data) this.isCloture = true;
  });
}

    // Open confirmation modal
    openConfirmationModal() {
      this.confirmationModalService.open(); // Open delete confirmation modal
    }
  
    // Close confirmation modal
    closeConfirmationModal() {
      this.confirmationModalService.close(); // Close delete confirmation modal
    }
}

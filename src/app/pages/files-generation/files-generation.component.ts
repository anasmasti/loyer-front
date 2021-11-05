import { HelperService } from 'src/app/services/helpers/helper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'files-generation',
  templateUrl: './files-generation.component.html',
  styleUrls: ['./files-generation.component.scss']
})
export class FilesGenerationComponent implements OnInit {

  constructor(private help: HelperService) { }

  dateCloture!: any;
  isCloture: boolean = false;
  showClotureSection: boolean = false
  hasNextCluture: boolean = false

  ngOnInit(): void {
    // Get next cloture date and check
    this.getNextClotureAndCheck()

    // Get the same function after 6 hours
    setInterval(() => {
      this.getNextClotureAndCheck()
    }, 21600000)
  }

  // Get the next cloture date from the server and check if has data and throw the check function
  getNextClotureAndCheck() {
    this.help.getNextClotureDate().subscribe(date => {
      console.log(date);

      this.dateCloture = date
      if (this.dateCloture.annee && this.dateCloture.mois) this.hasNextCluture = true
      this.checkNextCloture()
    })
  }

  // Check the next cloture
  checkNextCloture() {
    let today: Date = new Date()

    // Check if the next cloture's here 
    if (this.hasNextCluture) {
      // Put this month is cloture and show cloture section if next cloture match with today
      if (this.dateCloture.annee == today.getFullYear() && this.dateCloture.mois == (today.getMonth() + 1)) return [this.isCloture = false, this.showClotureSection = true]
      else return [this.isCloture = true, this.showClotureSection = true]
    }
    else return this.showClotureSection = false
  }

  // Cloture this month
  cloture() {
    this.isCloture = true
  }

}

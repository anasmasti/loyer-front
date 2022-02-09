import { ReportingService } from './../../services/reporting/reporting.service';
import { ClotureService } from '../../services/cloture/cloture.service';
import { ConfirmationModalService } from './../../services/confirmation-modal-service/confirmation-modal.service';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as fileSaver from 'file-saver';
import { DownloadService } from 'src/app/services/download-service/download.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'files-generation',
  templateUrl: './files-generation.component.html',
  styleUrls: ['./files-generation.component.scss'],
})
export class FilesGenerationComponent implements OnInit {
  today!: any;
  dateCloture!: any;
  isCloture: boolean = false;
  showClotureSection: boolean = false;
  hasNextCluture: boolean = false;
  dateSelected: boolean = false;
  filesForm!: FormGroup;
  userMatricule: any = localStorage.getItem('matricule');
  twelveHours: number = 1000 * 60 * 60 * 12;
  reporting: boolean;

  constructor(
    private help: HelperService,
    private confirmationModalService: ConfirmationModalService,
    private downloadService: DownloadService,
    private clotureService: ClotureService,
    private reportingService: ReportingService
  ) {
    this.reporting = environment.REPORTING;
  }

  ngOnInit(): void {
    // Instantiate form group for selected date
    this.filesForm = new FormGroup({
      date_gen: new FormControl('', [Validators.required]),
    });
    // Get next cloture date and check
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

  // Check if all inputs has invalid errors
  checkInputsValidation(targetInput: any) {
    return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
  }

  showButtons() {
    return (this.dateSelected = true);
  }

  downloadFiles() {
    let params = ['fichier-comptable-loyer', 'fichier-comptable-caution', 'fichier-ordre-virement', 'annex1' ]

    // let today = new Date()
    let date_gen = new Date(this.filesForm.get('date_gen')?.value);
    // Fill date cloture
    let date = {
      mois: date_gen.getMonth() + 1,
      annee: date_gen.getFullYear(),
    };

    params.forEach(param => {  
      console.log(param);
       
      // Path name
      let filename = param + `_${date.mois}-${date.annee}`;
      // console.log(filename);
      
  
      this.downloadService
        .dowloadFiles(filename, date, param)
        .subscribe((res) => {
          if (res) {
            fileSaver.saveAs(res, filename);
          }
        });
    });
  }

  generateReportings() {
    this.reportingService.generateReportings('all');
  }

  get date_gen() {
    return this.filesForm.get('date_gen');
  }
}

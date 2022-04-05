import { ReportingService } from './../../services/reporting/reporting.service';
import { ClotureService } from '../../services/cloture/cloture.service';
import { ConfirmationModalService } from './../../services/confirmation-modal-service/confirmation-modal.service';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import { DownloadService } from 'src/app/services/download-service/download.service';
import { environment } from 'src/environments/environment';
import dateClotureType from '../cloture/date-cloture.type';

@Component({
  selector: 'app-files-generation',
  templateUrl: './files-generation.component.html',
  styleUrls: ['./files-generation.component.scss'],
})
export class FilesGenerationComponent implements OnInit {
  dateSelected: boolean = false;
  filesForm!: FormGroup;
  userMatricule: any = localStorage.getItem('matricule');

  isCloture: boolean = false;
  showClotureSection: boolean = false;
  twelveHours: number = 1000 * 60 * 60 * 12;
  dateCloture!: any;
  hasNextCluture: boolean = false;
  today!: any;

  reporting: boolean;
  fileParams = [
    'fichier-comptable-loyer',
    'fichier-comptable-caution',
    'fichier-ordre-virement',
    'annex1',
  ];

  constructor(
    private downloadService: DownloadService,
    private reportingService: ReportingService,
    private help: HelperService
  ) {
    this.reporting = environment.REPORTING;
  }

  ngOnInit(): void {
    // Instantiate form group for selected date
    this.filesForm = new FormGroup({
      date_gen: new FormControl('', [Validators.required]),
    });
  }

  // Check if all inputs has invalid errors
  checkInputsValidation(targetInput: any) {
    return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
  }

  showButtons() {
    return (this.dateSelected = true);
  }

    // Get the next cloture date from the server
    getNextCloture() {
      this.help.getNextClotureDate().subscribe((date: dateClotureType) => {
        this.dateCloture = date;
      });
    }

  downloadFiles(params: string[]) {
    // let today = new Date()
    let date_gen = new Date(this.filesForm.get('date_gen')?.value);
    // Fill date cloture
    // let date = {
    //   mois: date_gen.getMonth() + 1,
    //   annee: date_gen.getFullYear(),
    // };

    params.forEach((param) => {
      // Path name
      // let filename = param + `_${date.mois}-${date.annee}`;
      let filename = param + `_${this.dateCloture.mois}-${this.dateCloture.annee}`;
      this.downloadService
        .dowloadFiles(filename, this.dateCloture, param)
        .subscribe((res) => {
          if (res) {
            saveAs(res, filename);
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

import { ReportingService } from './../../services/reporting/reporting.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import { DownloadService } from 'src/app/services/download-service/download.service';
import { environment } from 'src/environments/environment';

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

  errorMssage: string;
  hasError: boolean;

  constructor(
    private downloadService: DownloadService,
    private reportingService: ReportingService
  ) {
    this.reporting = environment.REPORTING;
    this.errorMssage = '';
    this.hasError = false;
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

  downloadFiles(params: string[]) {
    // let today = new Date()
    let date_gen = new Date(this.filesForm.get('date_gen')?.value);
    // Fill date cloture
    let date = {
      mois: date_gen.getMonth() + 1,
      annee: date_gen.getFullYear(),
    };

    params.forEach((param) => {
      // Path name
      let filename = param + `_${date.mois}-${date.annee}`;
      this.downloadService.dowloadFiles(filename, date, param).subscribe(
        (res) => {
          if (res) {
            saveAs(res, filename);
          }
        },
        (_) => {
          this.hasError = true;
          this.errorMssage =
            'Aucun fichier a exporter sur cette date, merci de réessayer avec une autre date.';
          setTimeout(() => {
            this.hasError = false;
            this.errorMssage = '';
          }, 3000);
        }
      );
    });
  }

  generateReportings() {
    this.reportingService.generateReportings('all');
  }

  get date_gen() {
    return this.filesForm.get('date_gen');
  }
}

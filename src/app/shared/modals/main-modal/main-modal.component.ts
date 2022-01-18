import { MainModalService } from '../../../services/main-modal/main-modal.service';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-modal',
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.scss']
})
export class MainModalComponent implements OnInit {
  @Input() closeBtn: boolean = true
  @Input() mainHeight!: string;
  @Input() id: string = 'mainModal'

  version!: string;

  constructor(private mainModalService: MainModalService) { }


  ngOnInit(): void {
    this.version = environment.APP_VERSION;
  }

  closeModal() {
    this.mainModalService.close( this.id );
  }
}
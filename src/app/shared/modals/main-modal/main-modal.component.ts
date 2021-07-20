import { MainModalService } from '../../../services/main-modal/main-modal.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-modal',
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.scss']
})
export class MainModalComponent implements OnInit {

  @Input() closeBtn: boolean = true
  @Input() mainHeight!: string;

  constructor(private mainModalService: MainModalService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.mainModalService.close();
  }

}

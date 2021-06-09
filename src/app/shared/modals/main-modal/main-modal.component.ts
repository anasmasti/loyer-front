import { MainModalService } from './../../../services/main-modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-modal',
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.scss']
})
export class MainModalComponent implements OnInit {

  constructor(private mainModalService: MainModalService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.mainModalService.close();
  }

}

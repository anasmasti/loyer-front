import { ConfirmationModalService } from '../../../services/confirmation-modal-service/confirmation-modal.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  @Input() closeBtn: boolean = true
  @Input() id: string = 'confirmationModal'
  

  constructor(private confirmationModalService: ConfirmationModalService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.confirmationModalService.close(this.id);
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-contrat',
  templateUrl: './edit-contrat.component.html',
  styleUrls: ['./edit-contrat.component.scss']
})
export class EditContratComponent implements OnInit {
  @Input() contrat!: any;
  
  constructor() { }

  ngOnInit(): void {
  }
}

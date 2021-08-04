import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-contrat',
  templateUrl: './edit-contrat.component.html',
  styleUrls: ['./edit-contrat.component.scss']
})
export class EditContratComponent implements OnInit {
  Modifier:string="Modifier";
  @Input() contrat!: any;
 
  constructor() { }

  ngOnInit(): void {
  
  }

  ngOnChanges() {
    // setTimeout(() => {
    //   console.log(this.contrat);
    // }, 500);
  }



}

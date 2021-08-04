import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'foncier-form',
  templateUrl: './foncier-form.component.html',
  styleUrls: ['./foncier-form.component.scss']
})
export class FoncierFormComponent implements OnInit {

  @Input() formType!: string;
  msg!: string;
  success: boolean = false;
  foncierForm!: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
    this.foncierForm = new FormGroup({
     
    });
  }

}

import { User } from './../../../models/User';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() User!: User;

  constructor() { }

  ngOnInit(): void { }

}

import { Component, Input, OnInit } from '@angular/core';
import { Signaletique } from 'src/app/models/Signaletique';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Input() signaletique!: Signaletique;
  constructor() {}

  ngOnInit(): void {}
}

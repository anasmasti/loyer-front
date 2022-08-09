import { Component, OnInit } from '@angular/core';
import { HelperService } from '@services/helpers/helper.service';

@Component({
  selector: 'app-signaletique-page',
  templateUrl: './signaletique-page.component.html',
  styleUrls: ['./signaletique-page.component.scss'],
})
export class SignaletiquePageComponent implements OnInit {
  constructor(private helperService: HelperService) {}

  ngOnInit(): void {}

  // Refrtech the page
  refrechPage() {
    this.helperService.refrechPage();
  }
}

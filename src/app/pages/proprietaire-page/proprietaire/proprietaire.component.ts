import { Component, OnInit } from '@angular/core';
import { ProprietaireService } from 'src/app/services/proprietaire-service/proprietaire.service';

@Component({
  selector: 'app-proprietaire',
  templateUrl: './proprietaire.component.html',
  styleUrls: ['./proprietaire.component.scss'],
})
export class ProprietaireComponent implements OnInit {
  // proprietaireForm !: FormGroup;
  Checkproprietaire : any = "";

  constructor(private proprietaire: ProprietaireService) { }

  ngOnInit(): void {
  }

}
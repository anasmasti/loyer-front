import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Proprietaire } from 'src/app/models/proprietaire';
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
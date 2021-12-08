import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportingService {
  param_url: string = 'reporting';

  constructor(private http: HttpClient) {}

  // Generate reportings
  generateReportings(type_reporting: any): Observable<any> {
    return this.http.get<any>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/generate/${type_reporting}`
    );
  }

  getReportings(type_reporting: string): Observable<any> {
    return this.http.get<any>(
      `${
        environment.API_URL_TEST + environment.API_VERSION + this.param_url
      }/${type_reporting}`
    );
  }
}



// {  
// "/generate/contrat/caution-en-cours",
// "/generate/contrat/echeances",

// "/generate/amenagement",
// "/generate/locaux-fermes",

// "/generate/Siege",
// "/generate/DR",
// "/generate/LF",
// "/generate/PV",
// "/generate/SV",
// }
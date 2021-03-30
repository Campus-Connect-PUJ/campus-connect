import { Injectable } from '@angular/core';
import { NetService } from 'src/app/utils/net.service';
import { Observable } from 'rxjs';
// import { NetService } from '@utils/net.service';
import { environment } from 'src/environments/environment';
import { RegimenAlimenticio } from './regimen-alimenticio';

@Injectable({
  providedIn: 'root'
})
export class RegimenAlimenticioService {

  constructor(private net: NetService) { }

  getRegimenAlimenticios(): Observable<RegimenAlimenticio[]> {
    const url = `${environment.baseUrl}/regimen_alimenticios`;
    return this.net.get<RegimenAlimenticio[]>(url);
  }

  getRegimenAlimenticioById(id: number): Observable<RegimenAlimenticio> {
    const url = `${environment.baseUrl}/regimen_alimenticio/${id}`;
    return this.net.get<RegimenAlimenticio>(url);
  }
}

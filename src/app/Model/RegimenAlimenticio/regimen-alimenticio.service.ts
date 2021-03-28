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

  getRestaurantes(): Observable<RegimenAlimenticio[]> {
    const url = `${environment.baseUrl}/regimenAlimenticios`;
    return this.net.get<RegimenAlimenticio[]>(url);
  }

  getRestauranteById(id: number): Observable<RegimenAlimenticio> {
    const url = `${environment.baseUrl}/regimenAlimenticio/${id}`;
    return this.net.get<RegimenAlimenticio>(url);
  }
}

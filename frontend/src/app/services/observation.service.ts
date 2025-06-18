import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observation } from '../../model';

@Injectable({
  providedIn: 'root',
})
export class ObservationService {
  private readonly apiUrl = 'https://localhost:7123/api/observation';

  private readonly http = inject(HttpClient);

  getObservations(): Observable<Observation[]> {
    return this.http.get<Observation[]>(this.apiUrl);
  }

  updateObservation(obs: Observation): Observable<Observation> {
    return this.http.put<Observation>(this.apiUrl, obs);
  }

  createObservation(obs: Observation): Observable<Observation> {
    return this.http.post<Observation>(this.apiUrl, obs);
  }
}

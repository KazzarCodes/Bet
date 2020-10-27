import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ServiceBase } from '../shared/ServiceBase';
import { Injectable } from '@angular/core';
import { EventModel } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})

export class EventService extends ServiceBase {

  constructor(private _http: HttpClient) {
    super();

    this.url = environment.url;
    this.api = 'api/Events/';
  }

  getEvents(tournamentId: number): Observable<any[]> {
    return this._http.get<EventModel[]>(this.url + this.api + 'tournamentevents/' + tournamentId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getEvent(id: number): Observable<any> {
    return this._http.get<EventModel>(this.url + this.api + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }



  saveEvent(event: EventModel): Observable<any> {
    return this._http.post<EventModel>(this.url + this.api, JSON.stringify(event), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateEvent(event: EventModel): Observable<any> {
    return this._http.put<EventModel>(this.url + this.api + event.eventId, JSON.stringify(event), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteEvent(id: number): Observable<any> {
    return this._http.delete<EventModel>(this.url + this.api + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
}

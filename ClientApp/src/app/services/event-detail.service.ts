import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ServiceBase } from '../shared/ServiceBase';
import { Injectable } from '@angular/core';
import { EventDetailModel } from '../models/event-detail.model';

@Injectable({
  providedIn: 'root'
})

export class EventDetailService extends ServiceBase {

  constructor(private _http: HttpClient) {
    super();

    this.url = environment.url;
    this.api = 'api/EventDetails/';
  }

  getEventDetails(eventId: number): Observable<any[]> {
    return this._http.get<EventDetailModel[]>(this.url + this.api + 'eventdetails/' + eventId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getEventDetail(id: number): Observable<any> {
    return this._http.get<EventDetailModel>(this.url + this.api + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveEventDetail(eventDetail: EventDetailModel): Observable<any> {
    return this._http.post<EventDetailModel>(this.url + this.api, JSON.stringify(eventDetail), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateEventDetail(eventDetail: EventDetailModel): Observable<any> {
    return this._http.put<EventDetailModel>(this.url + this.api + eventDetail.eventDetailId, JSON.stringify(eventDetail), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteEventDetail(id: number): Observable<any> {
    return this._http.delete<EventDetailModel>(this.url + this.api + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
}

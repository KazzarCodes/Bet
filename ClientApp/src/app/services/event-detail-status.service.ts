import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ServiceBase } from '../shared/ServiceBase';
import { Injectable } from '@angular/core';
import { EventDetailStatusModel } from '../models/event-detail-status.model';

@Injectable({
  providedIn: 'root'
})

export class EventDetailStatusService extends ServiceBase {

  constructor(private _http: HttpClient) {
    super();

    this.url = environment.url;
    this.api = 'api/EventDetailStatus/';
  }

  getStatuses(): Observable<any[]> {
    return this._http.get<EventDetailStatusModel[]>(this.url + this.api)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
}

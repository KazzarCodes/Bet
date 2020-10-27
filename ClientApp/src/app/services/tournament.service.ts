import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ServiceBase } from '../shared/ServiceBase';
import { Injectable } from '@angular/core';
import { TournamentModel } from '../models/tournament.model';

@Injectable({
  providedIn: 'root'
})

export class TournamentService extends ServiceBase {

  constructor(private _http: HttpClient) {
    super();

    this.url = environment.url;
    this.api = 'api/Tournaments/';
  }

  getTournaments(): Observable<any[]> {
    return this._http.get<TournamentModel[]>(this.url + this.api)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getTournament(id: number): Observable<any> {
    return this._http.get<TournamentModel>(this.url + this.api + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveTournament(tournament: TournamentModel): Observable<any> {
    return this._http.post<TournamentModel>(this.url + this.api, JSON.stringify(tournament), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateTournament(tournament: TournamentModel): Observable<any> {
    return this._http.put<TournamentModel>(this.url + this.api + tournament.tournamentId, JSON.stringify(tournament), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteTournament(id: number): Observable<any> {
    return this._http.delete<TournamentModel>(this.url + this.api + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
}

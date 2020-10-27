import { Component } from "@angular/core";
import { TournamentService } from "../../services/tournament.service";
import { Router, ActivatedRoute } from "@angular/router";
import { EventModel } from "../../models/event.model";
import { EventService } from "../../services/event.service";
import { TournamentModel } from "../../models/tournament.model";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})

export class EventComponent {

  public events: EventModel[] = [];

  private _tournamentId: number;
  private _parentTournament: TournamentModel;

  constructor(private _eventService: EventService,
    private _tournamentService: TournamentService,
    private _datePipe: DatePipe,
    private _router: Router,
    private _avRoute: ActivatedRoute) {

    const idParam = 'id';

    if (this._avRoute.snapshot.params[idParam]) {
      this._tournamentId = this._avRoute.snapshot.params[idParam];
    }

  }

  ngOnInit() {
    this.getEvents();
    this.getParentTournament();
  }

  private getEvents() {
    this._eventService.getEvents(this._tournamentId)
      .subscribe((data: EventModel[]) => {
        this.events = data;
      });
  }

  private getParentTournament() {
    this._tournamentService.getTournament(this._tournamentId)
      .subscribe((data: TournamentModel) => {
        this._parentTournament = data;
      });
  }

  public newEvent() {
    this._router.navigate(['/add-edit-event/' + 0 + '/' + this._tournamentId]);
  }

  public editEvent(eventId: number) {
    this._router.navigate(['/add-edit-event/' + eventId + '/' + this._tournamentId]);
  }

  public deleteEvent(eventId: number) {
    this._eventService.deleteEvent(eventId)
      .subscribe((data: EventModel[]) => {
        this.getEvents();
      });
  }

  public viewEvent(eventId: number) {
    this._router.navigate(['/event-detail/', eventId,]);
  }

  public viewTournaments() {
    this._router.navigate(['']);
  }

}

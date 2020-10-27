import * as _ from "lodash";
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { EventDetailModel } from "../../models/event-detail.model";
import { EventDetailService } from "../../services/event-detail.service";
import { EventDetailStatusService } from "../../services/event-detail-status.service";
import { EventDetailStatusModel } from "../../models/event-detail-status.model";
import { TournamentModel } from "../../models/tournament.model";
import { TournamentService } from "../../services/tournament.service";
import { EventModel } from "../../models/event.model";
import { EventService } from "../../services/event.service";

@Component({
  selector: 'event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})

export class EventDetailComponent {

  private eventId: number;
  public eventDetails: EventDetailModel[] = [];
  public statuses: EventDetailStatusModel[] = [];

  private _parentEvent: EventModel;

  constructor(private _eventDetailService: EventDetailService,
    private _statusService: EventDetailStatusService,
    private _eventService: EventService,
    private _router: Router,
    private _avRoute: ActivatedRoute) {

    const idParam = 'id';

    if (this._avRoute.snapshot.params[idParam]) {
      this.eventId = this._avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.getEventDetails();
    this.getStatuses();
    this.getParentEvent();
  }

  getEventDetails() {

    this._eventDetailService.getEventDetails(this.eventId)
      .subscribe((data: EventDetailModel[]) => {
        this.eventDetails = data;

        // map statuses
        this.eventDetails.forEach(ed => {

          let status = this.statuses.filter(s => s.eventDetailStatusId == ed.eventDetailStatusId);
          ed.eventDetailStatus = status[0].eventDetailStatusName;
        });
      });
  }

  getStatuses() {
    this._statusService.getStatuses()
      .subscribe((data: EventDetailStatusModel[]) => {
        this.statuses = data;
      });
  }

  private getParentEvent() {
    this._eventService.getEvent(this.eventId)
      .subscribe((data: EventModel) => {
        this._parentEvent = data;
      });
  }

  public newEventDetail() {
    this._router.navigate(['/add-edit-event-detail/' + 0 + '/' + this.eventId]);
  }

  public editEventDetail(eventDetailId: number) {
    this._router.navigate(['/add-edit-event-detail/' + eventDetailId + '/' + this.eventId]);
  }

  public deleteEventDetail(eventDetailId: number) {
    this._eventDetailService.deleteEventDetail(eventDetailId)
      .subscribe(() => {
        this.getEventDetails();
      });
  }

  public viewEvents() {
    this._router.navigate(['/event/', this._parentEvent.tournamentId]);
  }

  public viewTournaments() {
    this._router.navigate(['']);
  }

}

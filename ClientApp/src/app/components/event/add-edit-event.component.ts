import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { EventModel } from "../../models/event.model";
import { EventService } from "../../services/event.service";

@Component({
  selector: 'add-edit-event',
  templateUrl: './add-edit-event.component.html',
})

export class AddEditEventComponent {

  public actionType: string;
  private tournamentId: number;
  private eventId: number;

  public event: EventModel;

  constructor(private _eventService: EventService,
    private _router: Router,
    private _avRoute: ActivatedRoute) {

    this.actionType = 'Add';

    if (this._avRoute.snapshot.params['id']) {
      this.eventId = this._avRoute.snapshot.params['id'];
    }
    if (this._avRoute.snapshot.params['tournamentId']) {
      this.tournamentId = this._avRoute.snapshot.params['tournamentId'];
    }
  }

  ngOnInit() {

    this.event = new EventModel;
    this.getEvent();
  }

  getEvent() {

    if (this.eventId > 0) {
      this.actionType = 'Edit'

      this._eventService.getEvent(this.eventId)
        .subscribe((data: EventModel) => {
          this.event = data;
        });
    }

  }

  public persistEvent() {

    if (this.validate() === false)
      return;

    if (this.actionType === 'Add') {

      this.event.tournamentId = +this.tournamentId;

      this._eventService.saveEvent(this.event)
        .subscribe(() => {
          this._router.navigate(['/event/', this.tournamentId]);
        });
    }

    if (this.actionType === 'Edit') {
      this._eventService.updateEvent(this.event)
        .subscribe(() => {
          this._router.navigate(['/event/', this.tournamentId]);
        });
    }

  }

  private validate(): boolean {

    if (this.event.eventName === undefined || this.event.eventName.length === 0)
      return false;
    if (!this.event.eventNumber === undefined || this.event.eventNumber === 0)
      return false;
    if (!this.event.eventDateTime === undefined || !this.event.eventDateTime)
      return false;
    if (!this.event.eventEndDateTime === undefined || !this.event.eventEndDateTime)
      return false;
    if (!this.event.autoClose === undefined)
      return false;

    return true;
  }

  public cancel() {
    this._router.navigate(['/event/', this.tournamentId]);
  }

}

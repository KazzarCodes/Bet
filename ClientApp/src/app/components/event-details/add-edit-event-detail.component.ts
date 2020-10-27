import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { EventDetailService } from "../../services/event-detail.service";
import { EventDetailModel } from "../../models/event-detail.model";
import { EventDetailStatusModel } from "../../models/event-detail-status.model";
import { EventDetailStatusService } from "../../services/event-detail-status.service";

@Component({
  selector: 'add-edit-event-detail',
  templateUrl: './add-edit-event-detail.component.html',
})

export class AddEditEventDetailComponent {

  public actionType: string;
  private eventDetailId: number;
  private eventId: number;

  public statuses: EventDetailStatusModel[] = [];
  public eventDetail: EventDetailModel;

  constructor(private _eventDetailService: EventDetailService,
    private _statusService: EventDetailStatusService,
    private _router: Router,
    private _avRoute: ActivatedRoute) {

    this.actionType = 'Add';

    if (this._avRoute.snapshot.params['id']) {
      this.eventDetailId = this._avRoute.snapshot.params['id'];
    }
    if (this._avRoute.snapshot.params['eventId']) {
      this.eventId = this._avRoute.snapshot.params['eventId'];
    }
  }

  ngOnInit() {

    this.eventDetail = new EventDetailModel;
    this.getEventDetail();
    this.getStatuses();
  }

  getEventDetail() {

    if (this.eventDetailId > 0) {
      this.actionType = 'Edit'

      this._eventDetailService.getEventDetail(this.eventDetailId)
        .subscribe((data: EventDetailModel) => {
          this.eventDetail = data;
        });
    }
  }

  getStatuses() {
    this._statusService.getStatuses()
      .subscribe((data: EventDetailStatusModel[]) => {
        this.statuses = data;
      });
  }

  public persistEventDetail() {

    if (this.validate() === false)
      return;

    if (this.actionType === 'Add') {

      this.eventDetail.eventId = +this.eventId;

      this._eventDetailService.saveEventDetail(this.eventDetail)
        .subscribe(() => {
          this._router.navigate(['/event-detail/', this.eventId]);
        });
    }

    if (this.actionType === 'Edit') {
      this._eventDetailService.updateEventDetail(this.eventDetail)
        .subscribe(() => {
          this._router.navigate(['/event-detail/', this.eventId]);
        });
    }

  }

  private validate(): boolean {

    if (this.eventDetail.eventDetailName === undefined || this.eventDetail.eventDetailName.length === 0)
      return false;
    if (!this.eventDetail.eventDetailStatusId === undefined || this.eventDetail.eventDetailStatusId === 0)
      return false;
    if (!this.eventDetail.eventDetailOdd === undefined || this.eventDetail.eventDetailOdd === 0)
      return false;
    if (!this.eventDetail.finishingPosition === undefined || this.eventDetail.finishingPosition === 0)
      return false;
    if (!this.eventDetail.firstTimer === undefined)
      return false;

    return true;
  }

  public cancel() {
    this._router.navigate(['/event-detail/', this.eventId]);
  }

}

import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TournamentModel } from "../../models/tournament.model";
import { TournamentService } from "../../services/tournament.service";

@Component({
  selector: 'add-edit-tournament',
  templateUrl: './add-edit-tournament.component.html',
})

export class AddEditTournamentComponent {

  public actionType: string;
  private tournamentId: number;

  public tournament: TournamentModel;

  constructor(private _tournamentService: TournamentService,
    private _router: Router,
    private _avRoute: ActivatedRoute) {

    this.actionType = 'Add';

    if (this._avRoute.snapshot.params['id']) {
      this.tournamentId = this._avRoute.snapshot.params['id'];
    }
  }

  ngOnInit() {

    this.tournament = new TournamentModel;
    this.getTournament();
  }

  getTournament() {

    if (this.tournamentId > 0) {
      this.actionType = 'Edit'

      this._tournamentService.getTournament(this.tournamentId)
        .subscribe((data: TournamentModel) => {
          this.tournament = data;
        });
    }

  }

  public persistTournament() {

    if (this.validate() === false)
      return;

    if (this.actionType === 'Add') {

      this._tournamentService.saveTournament(this.tournament)
        .subscribe(() => {
          this._router.navigate(['//']);
        });
    }

    if (this.actionType === 'Edit') {
      this._tournamentService.updateTournament(this.tournament)
        .subscribe(() => {
          this._router.navigate(['//']);
        });
    }

  }

  private validate(): boolean {

    if (this.tournament.tournamentName === undefined || this.tournament.tournamentName.length === 0)
      return false;

    return true;
  }

  public cancel() {
    this._router.navigate(['//']);
  }

}

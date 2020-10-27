import { Component } from "@angular/core";
import { TournamentModel } from "../../models/tournament.model";
import { TournamentService } from "../../services/tournament.service";
import { Router } from "@angular/router";

@Component({
  selector: 'tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})

export class TournamentComponent {

  public tournaments: TournamentModel[] = [];

  constructor(private _tournamentService: TournamentService,
    private _router: Router) {
  }

  ngOnInit() {
    this.getTournaments();
  }

  getTournaments() {
    this._tournamentService.getTournaments()
      .subscribe((data: TournamentModel[]) => {
        this.tournaments = data;
      });

  }

  public newTournament() {
    this._router.navigate(['/add-edit-tournament/' + 0]);
  }

  public editTournament(tournamentId: number) {
    this._router.navigate(['/add-edit-tournament/' + tournamentId]);
  }

  public deleteTournament(tournamentId: number) {
    this._tournamentService.deleteTournament(tournamentId)
      .subscribe(() => {
        this.getTournaments();
      });
  }

  public viewTournament(tournamentId: number) {
    this._router.navigate(['/event/', tournamentId]);
  }

}

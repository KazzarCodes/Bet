import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TournamentComponent } from './components/tournament/tournament.component';
import { EventComponent } from './components/event/event.component';
import { TournamentService } from './services/tournament.service';
import { EventService } from './services/event.service';
import { AddEditEventComponent } from './components/event/add-edit-event.component';
import { AddEditTournamentComponent } from './components/tournament/add-edit-tournament.component';
import { EventDetailComponent } from './components/event-details/event-detail.component';
import { AddEditEventDetailComponent } from './components/event-details/add-edit-event-detail.component';
import { EventDetailService } from './services/event-detail.service';
import { EventDetailStatusService } from './services/event-detail-status.service';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    TournamentComponent,
    AddEditTournamentComponent,
    EventComponent,
    AddEditEventComponent,
    EventDetailComponent,
    AddEditEventDetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: TournamentComponent, pathMatch: 'full' },
      { path: 'add-edit-tournament/:id', component: AddEditTournamentComponent },
      { path: 'event/:id', component: EventComponent },
      { path: 'add-edit-event/:id/:tournamentId', component: AddEditEventComponent },
      { path: 'event-detail/:id', component: EventDetailComponent },
      { path: 'add-edit-event-detail/:id/:eventId', component: AddEditEventDetailComponent },
    ])
  ],
  providers: [
    TournamentService,
    EventService,
    EventDetailService,
    EventDetailStatusService,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

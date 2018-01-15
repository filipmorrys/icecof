import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IssuesComponent } from './issues/issues.component';
import { NavComponent } from './nav/nav.component';
import { TopologyService } from './topology.service';
import { HttpClientModule } from '@angular/common/http';
import { IssuesService } from './issues.service';
import { WorkOnTracksComponent } from './work-on-tracks/work-on-tracks.component';
import { AppRoutingModule } from './/app-routing.module';
import { IntervalsComponent } from './work-on-tracks/intervals/intervals.component';


@NgModule({
  declarations: [
    AppComponent,
    IssuesComponent,
    NavComponent,
    WorkOnTracksComponent,
    IntervalsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule, AppRoutingModule
  ],
  providers: [TopologyService, IssuesService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

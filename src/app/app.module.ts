import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IssuesComponent } from './issues/issues.component';
import { NavComponent } from './nav/nav.component';
import { TopologyService } from './topology.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    IssuesComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule
  ],
  providers: [TopologyService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

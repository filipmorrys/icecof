import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { IssuesComponent } from './issues/issues.component';
import { WorkOnTracksComponent } from './work-on-tracks/work-on-tracks.component';

const routes: Routes = [
  { path: '', component: IssuesComponent , pathMatch: 'full' },
  { path: 'issues', component: IssuesComponent , pathMatch: 'full' },
  { path: 'workOnTracks', component: WorkOnTracksComponent , pathMatch: 'full' },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }


import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../issues.service';
import { TopologyService } from '../topology.service';
import { WorkOnTrack, TrackTypeEntry, TrackId } from './work-on-tracks.model';

@Component({
  selector: 'app-work-on-tracks',
  templateUrl: './work-on-tracks.component.html',
  styleUrls: ['./work-on-tracks.component.css']
})
export class WorkOnTracksComponent implements OnInit {
  /**
   * Variable que indica el tipo de track asociado al intervalo.
   * Si trackBy === 1 seleccion por tipo
   * Si trackBy === 2 seleccion por lista
   */
  trackBy: number;

  workOnTrack: WorkOnTrack;

  constructor(private issuesService: IssuesService,
    private topologyService: TopologyService) {
  }

  ngOnInit() {
    this.workOnTrack = new WorkOnTrack();
    this.topologyService.findNodes()
      .then(() => { this.issuesService.findIssues(); });

    this.trackBy = 1;
    

  }

  onChangeTrackBy(selectedTrackBy: number) {
    if (this.trackBy != selectedTrackBy) {
      if (selectedTrackBy === 1) {
        this.workOnTrack.workIntervals[0].tracks = [new TrackTypeEntry()];
      } else {
        this.workOnTrack.workIntervals[0].tracks = [new TrackId()];
      }
    }
    this.trackBy = selectedTrackBy;
  }

}

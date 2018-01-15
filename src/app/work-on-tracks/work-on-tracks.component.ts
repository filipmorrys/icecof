import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../issues.service';
import { TopologyService } from '../topology.service';
import { WorkOnTrack, TrackTypeEntry, TrackId, WorkInterval } from './work-on-tracks.model';

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

  /**
   * WorkOnTrack que esta siendo editado
   */
  workOnTrack: WorkOnTrack;

  /**
   * Flag que indica que se está creando un intervalo dentro del trabajo en vía
   */
  addingInterval: boolean;

  /**
   * Tipo de intervalo que se está creando
   * Si intervalType === 1 intervalo por tipo
   * Si intervalType === 2 intervalo por lista
   */
  intervalType: number;

  constructor(private issuesService: IssuesService,
    private topologyService: TopologyService) {
  }

  ngOnInit() {
    // Obtenemos los nodos de la topologia
    this.topologyService.findNodes().then(() => { this.issuesService.findIssues(); });    
    // Inicialización del WorkOnTrack
    this.workOnTrack = new WorkOnTrack();
    // Valores por defecto
    this.trackBy = 1;
    this.addingInterval = false;
    this.intervalType = 1;
  }

  onSaveInterval(interval: WorkInterval) {
    this.workOnTrack.workIntervals.push(interval);
    this.addingInterval = false;
  }
}

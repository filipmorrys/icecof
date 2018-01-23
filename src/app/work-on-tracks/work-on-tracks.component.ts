import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../issues.service';
import { TopologyService } from '../topology.service';
import { WorkOnTrack, TrackTypeEntry, TrackIdEntry, WorkInterval } from './work-on-tracks.model';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

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

  @ViewChild('formWorkOnTrack') formWorkOnTrack: ElementRef;

  constructor(private issuesService: IssuesService,
    private topologyService: TopologyService) {
  }

  ngOnInit() {
    console.log(this.formWorkOnTrack);

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
    console.log('onSaveInterval');
    console.log(interval);
    this.workOnTrack.workIntervals.push(interval);
    this.addingInterval = false;
  }

  onCancelInterval(ev: boolean) {
    this.addingInterval = false;
  }

  saveWorkOnTrack() {

  }
}

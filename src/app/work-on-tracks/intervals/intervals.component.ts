import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WorkInterval, TrackTypeEntry, TrackId } from '../work-on-tracks.model';
import { TopologyService } from '../../topology.service';
import { Track } from '../../issues/issues.model';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-intervals',
  templateUrl: './intervals.component.html',
  styleUrls: ['./intervals.component.css']
})
export class IntervalsComponent implements OnInit {

  /**
   * Flag que indica que se está creando un intervalo dentro del trabajo en vía
   */
  @Input() addingInterval: boolean;

  /**
   * Tipo de intervalo que se está creando
   * Si intervalType === 1 intervalo por tipo
   * Si intervalType === 2 intervalo por lista
   */
  @Input() intervalType: number;

  @Output() saveInterval = new EventEmitter<WorkInterval>();

  @ViewChild('formInterval') formInterval: ElementRef;

  /**
   * Intervalo a añadir
   */
  interval: WorkInterval;

  /**
   * Array de tracks entre los nodos seleccionados.
   * Cambia en funcion de los nodos seleccinados
   */
  tracks: Array<Track>;

  constructor(private topologyService: TopologyService) {
    this.tracks = [];
  }

  ngOnInit() {
    this.topologyService.findNodes();
    this.initWorkInterval();
  }

  /**
   * Inicializa un intervalo
   */
  private initWorkInterval() {
    this.interval = new WorkInterval();
    if (this.intervalType === 1) {
      this.interval.tracks.push(new TrackTypeEntry());
    }
    else {
      this.interval.tracks.push(new TrackId());
    }
  }

  /**
     * Operacion invocada cuando se cambia el nodo inicial o final del formulario.
     * Recalcula las vías existentes entre nodo inicial y final
     */
  changeTracks() {
    console.log('changeTracks');
    if (!this.interval.startNode || !this.interval.endNode) {
      console.log('Se deben seleccionar ambos nodos');
      return;
    }

    this.topologyService.findTracks(
      this.topologyService.getNodeIdByMnemo(this.interval.startNode),
      this.topologyService.getNodeIdByMnemo(this.interval.endNode)
    ).then(
      (response: Array<Track>) => {
        this.tracks = response;
        this.tracks.forEach(
          (t: Track) => {
            // Los nombres cortos de las vías no nos llegan del servidor
            // tenemos que calcularlos
            t.initialNodeShortName = this.topologyService.getNodeByMnemo(t.initialNode).shortName;
            t.finalNodeShortName = this.topologyService.getNodeByMnemo(t.finalNode).shortName;
          }
        );
      }
    );
  }

  onSave(){
    console.log("Ale guardadito");
    this.saveInterval.emit(this.interval);
    this.formInterval.nativeElement.reset();
    this.initWorkInterval()
  }
}

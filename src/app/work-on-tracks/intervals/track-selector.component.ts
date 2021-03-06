import { Component, OnInit, Output, ElementRef, SimpleChanges } from '@angular/core';
import { TopologyService } from '../../topology.service';
import { Input } from '@angular/core';
import { Track } from '../../issues/issues.model';
import { EventEmitter } from '@angular/core';
import { TrackTypeEntry, TrackIdEntry, TrackType } from '../work-on-tracks.model';
import { ViewChild } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-track-selector',
  templateUrl: './track-selector.component.html',
  styleUrls: ['./track-selector.component.css']
})
export class TrackSelectorComponent implements OnInit, OnChanges {

  /**
   * Array de tracks
   */
  @Input() tracks: Array<Track>;

  /**
   * Tipo de intervalo:
   * 1: Por tipo de vía
   * 2: Por id de vía
   */
  @Input() intervalTypeBy: number;

  /**
   * EventEmitter para emitir la salida del componenten
   */
  @Output('onSelectTracks') eventEmmiterId: EventEmitter<Array<TrackIdEntry>> = new EventEmitter<Array<TrackIdEntry>>();

  /**
     * EventEmitter para emitir la salida del componenten
     */
  @Output('onSelectTypes') eventEmmiterTypes: EventEmitter<Array<TrackTypeEntry>> = new EventEmitter<Array<TrackTypeEntry>>();



  /**
   * Referencia del elemento select de destino
   */
  @ViewChild('destinationItems') destElem: ElementRef;

  /**
   * Valores seleccionados en el combo origen
   */
  origSelectedItems: Array<number>;

  /**
   * Todos los valores del combo de destino por reacks
   */
  destSelectedItemsByType: Array<TrackTypeEntry>;

  /**
   * Todos los valores del combo de destino por id
   */
  destSelectedItemsById: Array<TrackIdEntry>;


  /**
   * Constructor
   * @param topology servicio de topologia 
   */
  constructor(topology: TopologyService) { }

  ngOnInit() {
    this.origSelectedItems = [];
    this.destSelectedItemsById = [];
    this.destSelectedItemsByType = [];
  }

  /**
   * Metodo de la interfaz OnChange que se dispara cuando cambian los parametros de input.
   * Queremos que cuando esto pase se limpie el combo de destino
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.destSelectedItemsById = [];
    this.destSelectedItemsByType = [];
  }

  /**
   * Devuelve los elementos a mostrar en el combo origen.
   */
  getItems(): Array<Object> | Array<Track> {
    if (this.intervalTypeBy === 1) {
      return [
        { id: 0, name: this.getTrackTypeById(0) },
        { id: 1, name: this.getTrackTypeById(1) },
        { id: 2, name: this.getTrackTypeById(2) },
        { id: 3, name: this.getTrackTypeById(3) }
      ];
    } else {
      return this.tracks;
    }
  }

  /**
   * Formatea un elemento del combo origen, ya sea de tipo Track o de 
   * tipo TrackType
   * @param item 
   */
  format(item: any): string {
    if (item.initialNodeShortName && item.finalNodeShortName) {
      if (item.initialNodeShortName == item.finalNodeShortName) {
        return 'Vía ' + item.name + '(' + item.initialNodeShortName + ')';
      } else {
        return 'Vía ' + item.name + '(' + item.initialNodeShortName + '-' + item.finalNodeShortName + ')';
      }
    } else {
      return item.name;
    }
  }


  /**
   * Evento emitido cuando se pulsa uno de los botones para seleccionar 
   * elementos del combo origen
   * @param cutType 
   */
  onSelect(cutType: number) {
    for (let id of this.origSelectedItems) {
      if (this.validateExists(id)) {
        continue;
      }
      if (this.intervalTypeBy === 1) {
        this.destSelectedItemsByType.push({
          trackType: id,
          cutType: cutType
        });
        // Enviar el evento
        this.eventEmmiterTypes.emit(this.destSelectedItemsByType);
      } else {
        this.destSelectedItemsById.push({
          id: id,
          cutType: cutType
        });
        this.eventEmmiterId.emit(this.destSelectedItemsById);
      }
    }


  }

  /**
   * Devuelve true si el elemento seleccionado ya existe en el combo destino
   * @param id 
   */
  validateExists(id: number): boolean {
    let item: any;
    if (this.intervalTypeBy === 2) {
      for (item of this.destSelectedItemsById) {
        if (item.id === id) {
          return true;
        }
      }
      return false;
    } else {
      for (item of this.destSelectedItemsByType) {
        if (item.trackType != undefined && item.trackType === id) {
          return true;
        }
      }
      return false;
    }
  }

  /**
   * Formatea un elemento del combo destino
   * @param item 
   */
  formatDest(item: any): string {
    if (this.intervalTypeBy === 1) {
      return this.getTrackTypeById(item.trackType) + ' (' + this.getCutTypeById(item.cutType) + ')';
    } else {
      return this.getTrackName(item.id) + ' (' + this.getCutTypeById(item.cutType) + ')'
    }

  }

  /**
   * Devuelve un string que representa el tipo de vía
   * @param id 
   */
  getTrackTypeById(id: number): string {
    switch (id) {
      case 0:
        return 'Sentido par';
      case 1:
        return 'Sentido impar';
      case 2:
        return 'Ambos sentidos';
      case 3:
        return 'Estación';
      default:
        throw Error('Tipo no valido');
    }
  }

  /**
   * Devuelve un string que representa en tipo de corte
   * @param cutType 
   */
  getCutTypeById(cutType: number): string {
    switch (cutType) {
      case 0:
        return 'Total';
      case 1:
        return 'Electrificado';
      default:
        throw Error('Tipo no valido');
    }
  }

  getTrackName(id: number): string {
    for (let currentTrack of this.tracks) {
      if (currentTrack.id === id) return this.format(currentTrack);
    }
    return "";
  }

  onDelete() {
    let indexesToDelete = [];
    let options = this.destElem.nativeElement.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        indexesToDelete.push(i);
      }
    }
    if (this.intervalTypeBy === 2) {
      for (let index = indexesToDelete.length - 1; index >= 0; index--) {
        this.destSelectedItemsById.splice(indexesToDelete[index], 1); // así es como se elimina un elemento
      }

      // Enviar el evento
      this.eventEmmiterId.emit(this.destSelectedItemsById);
    } else {
      for (let index = indexesToDelete.length - 1; index >= 0; index--) {
        this.destSelectedItemsByType.splice(indexesToDelete[index], 1); // así es como se elimina un elemento
      }

      // Enviar el evento
      this.eventEmmiterTypes.emit(this.destSelectedItemsByType);
    }

  }
}

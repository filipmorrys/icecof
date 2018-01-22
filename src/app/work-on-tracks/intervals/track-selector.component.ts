import { Component, OnInit, Output, ElementRef } from '@angular/core';
import { TopologyService } from '../../topology.service';
import { Input } from '@angular/core';
import { Track } from '../../issues/issues.model';
import { EventEmitter } from '@angular/core';
import { TrackTypeEntry, TrackIdEntry, TrackType } from '../work-on-tracks.model';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-track-selector',
  templateUrl: './track-selector.component.html',
  styleUrls: ['./track-selector.component.css']
})
export class TrackSelectorComponent implements OnInit {

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

  @Output('onSelectTracks') eventEmmiter: EventEmitter<Array<TrackTypeEntry | TrackIdEntry>> = new EventEmitter<Array<TrackTypeEntry | TrackIdEntry>>();

  @ViewChild('destinationItems') destElem: ElementRef;

  /**
   * Valores del combo origen
   */
  origSelectedItems: Array<number>;
  destSelectedItems: Array<TrackTypeEntry | TrackIdEntry>;

  constructor(topology: TopologyService) { }

  ngOnInit() {
    this.origSelectedItems = [];
    this.destSelectedItems = [];
  }

  getItems(): Array<Object> | Array<Track> {
    console.log('intervalTypeBy: ' + this.intervalTypeBy);
    if (this.intervalTypeBy === 1) {
      return [
        { id: 0, name: this.getTrackTypeById(0) },
        { id: 1, name: this.getTrackTypeById(1) },
        { id: 2, name: this.getTrackTypeById(2) },
        { id: 3, name: this.getTrackTypeById(3) }
      ];
    } else {
      console.log(this.tracks);
      return this.tracks;
    }
  }

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


  onSelect(cutType: number) {
    for (let id of this.origSelectedItems) {
      if (this.validateExists(id)) {
        continue;
      }
      if (this.intervalTypeBy === 1) {
        this.destSelectedItems.push({
          trackType: id,
          cutType: cutType
        });
      } else {
        this.destSelectedItems.push({
          id: id,
          cutType: cutType
        });
      }
    }

    // Enviar el evento
    this.eventEmmiter.emit(this.destSelectedItems);
  }

  validateExists(id: number): boolean {
    let item: any;
    for (item of this.destSelectedItems) {

      if (item.trackType != undefined && item.trackType === id) {
        return true;
      } else if (item.id === id) {
        return true;
      }
    }
    return false;
  }

  formatDest(item: any): string {
    if (this.intervalTypeBy === 1) {
      return this.getTrackTypeById(item.trackType) + ' (' + this.getCutTypeById(item.cutType) + ')';
    } else {
      return this.getTrackName(item.id) + ' (' + this.getCutTypeById(item.cutType) + ')'
    }

  }

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

    for (let index = indexesToDelete.length - 1; index >= 0; index--) {
      this.destSelectedItems.splice(indexesToDelete[index], 1); // así es como se elimina un elemento
    }

    // Enviar el evento
    this.eventEmmiter.emit(this.destSelectedItems);

  }
}

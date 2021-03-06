import { Component, OnInit } from '@angular/core';
import { Issue, IssueState, TrackType, ComponentState, Node, Track } from './issues.model';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { TopologyService } from '../topology.service';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  /**
   * Estado en el que se encuentra el commponente, que puede ser:
   *  - Modo Creación
   *  - Modo Edición
   *  - Modo Consulta
   *  - Modo por defecto
   */
  componentState: ComponentState;

  /**
   * Issue seleccionada de la lista de la tabla.
   *  - En Modo creación esta variable será una instancia vacía
   *  - En Modo edición esta variable será la issue que estamos editando
   *  - En Modo consulta esta variable será la issue que estamos consultando
   *  - En modo default esta variable sera nula
   */
  issueSelected: Issue;

  /**
   * Indice numérico de la Issue que seleccionada. Cuando no haya ninguna issue
   * seleccionada esta variable será -1
   */
  indexSelected: number;

  /**
   * Array de tracks entre los nodos seleccionados.
   * Cambia en funcion de los nodos seleccinados
   */
  tracks: Array<Track>;

  @ViewChild('formIssue') formIssue: ElementRef;

  constructor(private topology: TopologyService, 
              private issuesService: IssuesService, 
              private renderer: Renderer2) { }

  ngOnInit() {

    console.log(new Date('2018-01-01T10:00'));
    this.indexSelected = -1;

    this.componentState = ComponentState.Default;

    this.tracks = [];
    // Sincronizacion: invocamos de esta manera para
    // que primero nos lleguen los nodos y despues las
    // issues
    this.topology.findNodes()
    .then(
      () => {
        this.issuesService.findIssues();
      } 
    );

  }


  /**
   * Operación invocada desde la vista cuando se hace click sobre una Issue en la tabla
   * @param i indice de la Issue sobre la que se ha hecho click
   */
  clickRow(i: number) {
    if (this.componentState === ComponentState.NewIssue || this.componentState === ComponentState.EditIssue) {
      return;
    }
    if (this.indexSelected === i) {
      this.deselectRow(i);
      this.setState(ComponentState.Default, i);
    } else {
      this.deselectRow(this.indexSelected);
      this.selectRow(i);
      this.setState(ComponentState.ConsultIssue, i);
    }
  }


  /**
   * Establece el estado del componente
   * @param state estado del componente
   * @param i indice de la issue seleccionada, cuando aplique
   */
  setState(state: ComponentState, i: number = -1) {
    this.componentState = state;
    if (state === ComponentState.Default) {
      this.issueSelected = null;
      this.deselectRow(this.indexSelected);
      this.indexSelected = -1;
      return;
    }
    if (state === ComponentState.NewIssue) {
      this.issueSelected = new Issue();
      this.changeTracks();
      console.log('Issue: ' + this.issueSelected.code);
      return;
    }
    this.issueSelected = Object.create(this.issuesService.issues[i]);
    this.changeTracks();
    console.log('Componente en modo: ' + this.componentState);
  }


  /**
   * Marca como seleccionada en la tabla la fila con índice i
   * @param i indice de la fila
   */
  selectRow(i: number) {
    if (i === -1) {
      return;
    }
    let tr = document.getElementById('row_' + i);
    this.renderer.addClass(tr, 'selected');
    this.indexSelected = i;
  }

  /**
   * Deselecciona en la tabla la fila con índice i
   * @param i indice de la fila
   */
  deselectRow(i: number) {
    if (i === -1) {
      return;
    }
    let tr = document.getElementById('row_' + i);
    this.renderer.removeClass(tr, 'selected');
    this.indexSelected = -1;
  }

  /**
   * Accion invocada cuando el usuario pulsa crear issue
   */
  createIssue() {
    console.log('createIssue');
    this.setState(ComponentState.NewIssue);
  }

  /**
   * Accion invocada cuando el usuario pulsa editar issue
   */
  editIssue() {
    console.log('editIssue');
    this.setState(ComponentState.EditIssue, this.indexSelected);
  }

  /**
   * Accion invocada cuando el usuario pulsa borrar issue
   */
  deleteIssue() {
    console.log('deleteIssue');
    this.issuesService.issues.splice(this.indexSelected, 1);
    this.setState(ComponentState.Default);
  }

  /**
   * Cancelar edicion
   */
  cancelEdition() {
    console.log('cancelEdition');
    this.setState(ComponentState.Default);
  }

  /**
   * Operacion invocada cuando se cambia el nodo inicial o final del formulario.
   * Recalcula las vías existentes entre nodo inicial y final
   */
  changeTracks() {
    console.log('changeTracks');
    if (!this.issueSelected.initialNode || !this.issueSelected.finalNode) {
      console.log('Se deben seleccionar ambos nodos');
      return;
    }

    this.topology.findTracks(
      this.topology.getNodeIdByMnemo(this.issueSelected.initialNode), 
      this.topology.getNodeIdByMnemo(this.issueSelected.finalNode)
    ).then(
      (response: Array<Track>) => {
        this.tracks = response;
        this.tracks.forEach(
          (t: Track) => {
            // Los nombres cortos de las vías no nos llegan del servidor
            // tenemos que calcularlos
            t.initialNodeShortName = this.topology.getNodeByMnemo(t.initialNode).shortName;
            t.finalNodeShortName = this.topology.getNodeByMnemo(t.finalNode).shortName;
          }
        );
      }
    );
  }


  /**
   * Salvar la issue
   */
  saveIssue() {
    // Salvar la issue:
    if(this.componentState === ComponentState.NewIssue) {
      this.issuesService.save(this.issueSelected);
    } else if(this.componentState === ComponentState.EditIssue) {
      this.issuesService.issues[this.indexSelected] = this.issueSelected;
    } else {
      throw new Error('Estado del componente incorrecto: ' + this.componentState);
    }
    this.setState(ComponentState.Default);
  }
}


import { Component, OnInit } from '@angular/core';
import { Issue, IssueState, TrackType, ComponentState, Node } from './issues.model';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { TopologyService } from '../topology.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  /**
   * Lista de issues 
   */
  issues: Array<Issue>;

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
   * Array de nodos de la topología
   */
  nodes: Array<Node>;

  @ViewChild('tableIssues') tableIssues: ElementRef;

  constructor(private topology: TopologyService, private renderer: Renderer2) { }

  ngOnInit() {

    console.log('Table: ' + this.tableIssues);
    this.indexSelected = -1;

    this.componentState = ComponentState.Default;

    this.nodes = [];

    this.topology.findNodes().then((response:Array<Node>) => {
      this.nodes = response;
    });


    this.issues = [
      {
        code: 'Issue uno',
        description: 'Issue numero 1',
        type: 'Retraso',
        subtype: 'Retraso en nodo',
        state: IssueState.Open,
        initialNode: {
          id: 1,
          mnemonic: 'ND.SID1',
          name: 'Saiding 1',
          shortName: 'SID1',
          sectionKp: 100
        },
        finalNode: {
          id: 2,
          mnemonic: 'ND.SID2',
          name: 'Saiding 2',
          shortName: 'SID2',
          sectionKp: 200
        },
        initialHour: '12:00:00',
        finalHour: '16:00:00',
        expectedFinalHour: '16:00:00',
        tracks: [
          {
            mnemonic: 'TRK.SID1.1',
            name: '1ST',
            trackType: TrackType.Station,
            initialNode: 'ND.SID1',
            finalNode: null
          }
        ]
      },
      {
        code: 'Issue 2',
        description: 'Issue numero 2',
        type: 'Retraso',
        subtype: 'Retraso en nodo',
        state: IssueState.Open,
        initialNode: {
          id: 1,
          mnemonic: 'ND.MED',
          name: 'Medina',
          shortName: 'Med',
          sectionKp: 100
        },
        finalNode: {
          id: 2,
          mnemonic: 'ND.MEC',
          name: 'Meca',
          shortName: 'MEC',
          sectionKp: 200
        },
        initialHour: '12:00:00',
        finalHour: '16:00:00',
        expectedFinalHour: '16:00:00',
        tracks: [
          {
            mnemonic: 'TRK.MED.1',
            name: '1ST',
            trackType: TrackType.Station,
            initialNode: 'ND.',
            finalNode: null
          }
        ]
      }

    ];
  }

  /**
   * Operación invocada desde la vista cuando se hace click sobre una Issue en la tabla
   * @param i indice de la Issue sobre la que se ha hecho click
   */
  clickRow(i: number) {
    if(this.componentState == ComponentState.NewIssue || this.componentState == ComponentState.EditIssue) {
      return;
    }
    if (this.indexSelected == i) {
      this.deselectRow(i);
      this.setState(ComponentState.Default, i);
    } else {
      this.deselectRow(this.indexSelected)
      this.selectRow(i);
      this.setState(ComponentState.ConsultIssue, i);
    }
  }


  setState(state: ComponentState, i: number = -1) {
    this.componentState = state;
    if (state == ComponentState.Default) {
      this.issueSelected = null;
      this.deselectRow(this.indexSelected);
      this.indexSelected = -1;
      return;
    }
    if (state == ComponentState.NewIssue) {
      this.issueSelected = new Issue();
      console.log('Issue: '+this.issueSelected.code);
      return;
    }
    this.issueSelected = this.issues[i];
    console.log('Componente en modo: ' + this.componentState);
  }


  /**
   * Marca como seleccionada en la tabla la fila con índice i
   * @param i indice de la fila
   */
  selectRow(i: number) {
    if (i == -1) {
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
    if (i == -1) {
      return;
    }
    let tr = document.getElementById('row_' + i);
    this.renderer.removeClass(tr, 'selected');
    this.indexSelected = -1;
  }

  createIssue() {
    console.log('createIssue');
    this.setState(ComponentState.NewIssue);
  }

  editIssue() {
    console.log('editIssue');
    this.setState(ComponentState.EditIssue, this.indexSelected);
  }

  deleteIssue() {
    console.log('deleteIssue');
    this.issues.splice(this.indexSelected, 1);
    this.setState(ComponentState.Default);
  }

  /**
   * Cancelar edicion
   */
  cancelEdition(){
    console.log('cancelEdition');
    this.setState(ComponentState.Default);
  } 
}


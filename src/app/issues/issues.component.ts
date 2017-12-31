import { Component, OnInit } from '@angular/core';
import { Issue, IssueState, TrackType, ComponentState } from './issues.model';
import { initDomAdapter } from '@angular/platform-browser/src/browser';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';

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

  @ViewChild('tableIssues') tableIssues: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {

    console.log('Table: ' + this.tableIssues);
    this.indexSelected = -1;

    this.componentState = ComponentState.Default;

    this.issues = [
      {
        code: 'Issue uno',
        description: 'Issue numero 1',
        type: 'Retraso',
        subtype: 'Retraso en nodo',
        state: IssueState.Open,
        initialNode: {
          mnemonic: 'ND.SID1',
          name: 'Saiding 1',
          shortName: 'SID1'
        },
        finalNode: {
          mnemonic: 'ND.SID2',
          name: 'Saiding 2',
          shortName: 'SID2'
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
          mnemonic: 'ND.MED',
          name: 'Medina',
          shortName: 'Med'
        },
        finalNode: {
          mnemonic: 'ND.MEC',
          name: 'Meca',
          shortName: 'MEC'
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
      this.indexSelected = -1;
      return;
    }
    this.issueSelected = this.issues[i];
    console.log('Issue: '+this.issueSelected.code);
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
    this.setState(ComponentState.EditIssue);
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
    console.log('cancel Edition');
    this.setState(ComponentState.Default);
  } 
}


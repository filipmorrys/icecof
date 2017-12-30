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
  issues:Array<Issue>; 

  componentState: ComponentState;

  issueSelected: Issue;

  indexSelected: number;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {

    this.indexSelected = -1;

    this.componentState = ComponentState.None;

    this.issues = [
      {
        code: 'Issue 1',
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
        finalHour:'16:00:00',
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
        finalHour:'16:00:00',
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

  clickRow(i) {
    if(this.indexSelected == i) {
      this.deselectRow(i);
    } else {
      this.deselectRow(this.indexSelected)
      this.selectRow(i);
    }
  }

  selectRow(i) {
    if(i == -1) {
      return;
    }
    let tr = document.getElementById('row_'+i);  
    this.renderer.addClass(tr, 'selected');
    this.indexSelected = i;
  }

  deselectRow(i) {
    if(i == -1) {
      return;
    }
    let tr = document.getElementById('row_'+i);  
    this.renderer.removeClass(tr, 'selected');
    this.indexSelected = -1;
  }

}


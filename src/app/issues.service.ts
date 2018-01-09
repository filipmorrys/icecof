import { Injectable } from '@angular/core';
import { Issue } from './issues/issues.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IssuesService {
  
  /**
   * Lista de issues
   */
  issues: Array<Issue>;
  
  constructor(private http: HttpClient) {
    this.issues = [];
  }
  
  save(issue: Issue): void {
    let body = {
      id: 1,
      code: issue.code,
      description: issue.description,
      type: issue.type,
      subtype: issue.subtype,
      state: 'Abierta',
      initialNode: issue.initialNode.mnemonic,
      finalNode: issue.finalNode.mnemonic,
      initialHour: new Date(),
      finalHour: new Date(),
      expectedFinalHour: new Date(),
      tracks: [
        {
          trackMnemo: issue.tracks[0].mnemonic
        }
      ]
    };

    this.http.post('http://localhost:8080/issues', body).subscribe(
      (response) => {
        // Actualizamos las issues
        this.findIssues();
      },
      (error) => {
        console.log('Error: Unable to save issue');
      }
    );
  }

  findIssues(): void {
    this.http.get('http://localhost:8080/issues').subscribe(
      (response:any) => {
        this.issues = response;
      },
      (error) => {
        console.log('Error: Unable to get issues');
      }
    );
  }

}

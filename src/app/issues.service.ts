import { Injectable } from '@angular/core';
import { Issue } from './issues/issues.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TopologyService } from './topology.service';

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
      code: issue.code,
      description: issue.description,
      type: issue.type,
      subtype: issue.subtype,
      state: issue.state,
      initialNode: issue.initialNode,
      finalNode: issue.finalNode,
      initialHour: new Date(issue.initialHour).getTime(),
      finalHour: new Date(issue.finalHour).getTime(),
      expectedFinalHour: new Date(issue.expectedFinalHour).getTime(), 
      tracks: issue.tracks
    };
    /*
    let body = JSON.stringify(
      issue, 
      (key, value) => {
        if(key === 'initialHour' || key === 'finalHour' || key ==='expectedFinalHour') {
          return new Date(value).toISOString();
        } 
        return value;
      }
    );
    */
    this.http.post('http://localhost:8080//api/issues', body).subscribe(
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
    this.issues = [];
    this.http.get('http://localhost:8080/api/issues').subscribe(
      (response:any) => {
        response.forEach(elem => {
          this.issues.push({
            id: elem.id,
            code: elem.code,
            description: elem.description,
            type: elem.type,
            subtype: elem.subtype,
            state: elem.state,
            initialNode: elem.initialNode,
            finalNode: elem.finalNode,
            initialHour: new Date(elem.initialHour),
            finalHour: new Date(elem.finalHour),
            expectedFinalHour: new Date(elem.expectedFinalHour),
            tracks: elem.tracks
          });
          console.log(this.issues);
          
        });
      },
      (error) => {
        console.log('Error: Unable to get issues');
      }
    );
  }

}

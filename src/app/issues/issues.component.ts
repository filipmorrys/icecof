import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  /**
   * Lista de issues 
   */
  issues:Array<string>; 

  constructor() { }

  ngOnInit() {
    this.issues = [];
  }

}


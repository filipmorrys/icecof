import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @ViewChild('issuesMenu') issuesMenu: ElementRef;

  @ViewChild('workOnTracksMenu') workOnTrackMenu: ElementRef;
  
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  clickOnIssues() {
    this.renderer.removeClass(this.workOnTrackMenu.nativeElement, 'active');
    this.renderer.addClass(this.issuesMenu.nativeElement, 'active');
  }

  clickOnWorkOnTracks() {
    this.renderer.addClass(this.workOnTrackMenu.nativeElement, 'active');
    this.renderer.removeClass(this.issuesMenu.nativeElement, 'active');
  }

}

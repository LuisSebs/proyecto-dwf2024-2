import { AfterViewInit, Component, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { createRoot } from 'react-dom/client';
import Experience from '../Experience';
import * as React from 'react';

@Component({
  selector: 'app-experience',
  template: '<div [id]="rootId"></div>',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnChanges, AfterViewInit, OnDestroy{

  public rootId = 'rootId'

  ngOnChanges(changes: SimpleChanges){
    this.render();
  }

  ngAfterViewInit(): void {
      this.render();
  }

  ngOnDestroy(): void {
      
  }

  private render(){
    const container = document.getElementById(this.rootId)
    const root = createRoot(container!); // ! because we're using TypeScript
    root.render(React.createElement(Experience))
  }

}

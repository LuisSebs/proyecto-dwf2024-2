import { AfterViewInit, Component, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { createRoot } from 'react-dom/client';
import { Cart } from '../Cart';
import * as React from 'react'

@Component({
  selector: 'app-threejs',
  template: '<div [id]="rootId"></div>',
  styleUrl: './threejs.component.css'
})
export class ThreejsComponent implements OnChanges, AfterViewInit, OnDestroy{
  public rootId = 'rootId';

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
    root.render(React.createElement(Cart))
  }

} 

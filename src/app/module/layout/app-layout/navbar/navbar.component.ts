import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RouteInfo } from '../_model/route-info';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { faUser } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    loggedIn = false;

    userIcon = faUser;

    ngOnInit(){
      if(localStorage.getItem("token")){
        this.loggedIn = true;
      }
    }


}

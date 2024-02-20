import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, ActivatedRoute } from '@angular/router';
import { BaitaptoanComponent } from './baitaptoan/baitaptoan.component';
import { EventService } from './services/EventService';

import {routes} from './app.routes'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, RouterModule, 
    BaitaptoanComponent
  ],
  template: `
    <!-- <nav class="navbar navbar-expand-lg bg-light"> -->
      <!-- <div class="container-fluid"> -->
        <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent"> -->
          <!-- <ul class="navbar-nav me-auto mb-2 mb-lg-0"> -->
          <!-- <ul class="nav nav-pills bg-light">
            <li class="nav-item ">
              <a class="nav-link active" routerLink='/' data-toggle="pill">Toán Tính</a>
            </li>
            <li class="nav-item" >
              <a class="nav-link" routerLink="sosanh" data-toggle="pill">Toán So Sánh</a>
            </li>
          </ul>           -->
        <!-- </div> -->
      <!-- </div> -->
    <!-- </nav> -->
    <div class="container-fluid">
      <nav class="nav nav-pills bg-light">         
        <!-- <a class="nav-link" [ngClass]="title===route[0]['title'] ? 'active' : ''" [routerLink]="[route[0]['path']]">Toán Tính</a>
        <a class="nav-link" [ngClass]="title===route[1]['title'] ? 'active' : ''" [routerLink]="[route[1]['path']]">Toán So Sánh</a>       -->
        <button class="nav-link" [ngClass]="title===route[0]['title'] ? 'active' : ''" [routerLink]="[route[0]['path']]">Toán Tính</button>
        <button class="nav-link" [ngClass]="title===route[1]['title'] ? 'active' : ''" [routerLink]="[route[1]['path']]">Toán So Sánh</button> 
      </nav>
    <!-- </div> -->
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = '';
  route = routes

  constructor(private eventService: EventService){
    this.eventService.listen('updateTitle', (title: string)=>{
      this.title = title
    })
  }
}

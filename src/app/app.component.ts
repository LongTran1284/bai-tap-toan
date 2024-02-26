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
    
    <div class="container-fluid">
      <nav class="nav nav-pills bg-light">         
      <button *ngFor="let item of route; index as j"
        class="nav-link" 
        [ngClass]="title===item['title'] ? 'active' : ''" 
        [routerLink]="[item['path']]"
      >
        {{ nav_names[j] }}
      </button>

        <!-- <button class="nav-link" [ngClass]="title===route[0]['title'] ? 'active' : ''" [routerLink]="[route[0]['path']]">Toán Tính</button>
        <button class="nav-link" [ngClass]="title===route[1]['title'] ? 'active' : ''" [routerLink]="[route[1]['path']]">Toán So Sánh</button>  -->
      </nav>
      
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = '';
  route = routes;
  nav_names: string[] = ['Toán Tính', 'Toán So Sánh', 'Tỉ Lệ Thức']

  constructor(private eventService: EventService){
    this.eventService.listen('updateTitle', (title: string)=>{
      this.title = title
    })
    // console.log(this.title)
  }
}

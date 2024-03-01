import { Component, Input } from '@angular/core';

import { WorkInterface } from '../../shared/interface/workinterface'; 
import { CommonModule } from '@angular/common';
import { ItemTilethucComponent } from './item-tilethuc.component';

@Component({
  selector: 'work-tilethuc',
  standalone: true,
  imports: [
    CommonModule,
    ItemTilethucComponent,
  ],
  template: `
    <div class="container chia px-0 shadow-sm d-flex flex-wrap justify-content-between" >
      <item-tilethuc *ngFor="let item of works; index as j"
        [item]="item"        
        [id]="j"
      ></item-tilethuc>
    </div>
  `,
  styleUrl: './work-tilethuc.component.css'
})
export class WorkTilethucComponent {
  @Input() works: WorkInterface[] = []
}

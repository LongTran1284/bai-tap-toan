import { Component, Input } from '@angular/core';
import { ChiaItemComponent } from './chia-item.component';
import { CommonModule } from '@angular/common';
import { WorkInterface } from '../../../shared/interface/workinterface';

@Component({
  selector: 'chia',
  standalone: true,
  imports: [
    CommonModule,    
    ChiaItemComponent
  ],
  template: `
    <div class="container chia px-0 shadow-sm d-flex flex-wrap justify-content-between" >      
      <chia-item *ngFor="let work of works; index as j"
        [sobichia]="work.x"
        [sochia]="work.y"
        [id]="j"
      ></chia-item>
    </div>
  `,
  styleUrl: './chia.component.css'
})
export class ChiaComponent { 
  @Input() works: WorkInterface[] = []
  
}

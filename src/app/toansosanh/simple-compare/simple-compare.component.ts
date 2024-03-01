import { Component, Input } from '@angular/core';
import { SimpleItemComponent } from './simple-item.component';
import { CommonModule } from '@angular/common';
import { WorkInterface } from '../../shared/interface/workinterface';

@Component({
  selector: 'simple-compare',
  standalone: true,
  imports: [
    CommonModule,
    SimpleItemComponent
  ],
  template: `
    <div class="container chia px-0 shadow-sm d-flex flex-wrap justify-content-between" >      
      <simple-item *ngFor="let item of works; index as j"
        [num1]="item.x"
        [num2]="item.y"      
        [id]="j"
      ></simple-item>
    </div>
  `,
  styleUrl: './simple-compare.component.css'
})
export class SimpleCompareComponent {  
  @Input() works: WorkInterface[] = []
}

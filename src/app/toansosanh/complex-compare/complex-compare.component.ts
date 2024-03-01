import { Component, Input } from '@angular/core';
import { ComplexItemComponent } from './complex-item.component';
import { CommonModule } from '@angular/common';
import { WorkInterface } from '../../shared/interface/workinterface';

@Component({
  selector: 'complex-compare',
  standalone: true,
  imports: [
    CommonModule,
    ComplexItemComponent
  ],
  template: `
    <div class="container chia px-0 shadow-sm d-flex flex-wrap justify-content-between" >     
      <complex-item *ngFor="let item of works; index as j"
        [num1]="item.x"
        [num2]="item.y"      
        [id]="j"
      ></complex-item>
    </div>
  `,
  styleUrl: './complex-compare.component.css'
})
export class ComplexCompareComponent {  
  @Input() works: WorkInterface[] = []
}

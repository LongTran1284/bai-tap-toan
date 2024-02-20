import { Component, Input } from '@angular/core';
import { ComplexItemComponent } from './complex-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'complex-compare',
  standalone: true,
  imports: [
    CommonModule,
    ComplexItemComponent
  ],
  template: `
    <div class="container chia px-0 shadow-sm d-flex flex-wrap justify-content-between" >
      <complex-item *ngFor="let num1 of num_list_1; index as j"
        [num1]="num1"
        [num2]="num_list_2[j]"      
      ></complex-item>
    </div>
  `,
  styleUrl: './complex-compare.component.css'
})
export class ComplexCompareComponent {
  @Input() num_list_1: number[] = []
  @Input() num_list_2: number[] = []
}

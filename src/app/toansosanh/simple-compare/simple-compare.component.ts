import { Component, Input } from '@angular/core';
import { SimpleItemComponent } from './simple-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'simple-compare',
  standalone: true,
  imports: [
    CommonModule,
    SimpleItemComponent
  ],
  template: `
    <div class="container chia px-0 shadow-sm d-flex flex-wrap justify-content-between" >
      <simple-item *ngFor="let num1 of num_list_1; index as j"
        [num1]="num1"
        [num2]="num_list_2[j]"      
      ></simple-item>
    </div>
  `,
  styleUrl: './simple-compare.component.css'
})
export class SimpleCompareComponent {
  @Input() num_list_1: number[] = []
  @Input() num_list_2: number[] = []
}

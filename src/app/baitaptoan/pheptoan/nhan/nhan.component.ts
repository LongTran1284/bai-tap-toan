import { Component, Input } from '@angular/core';
import { NhanItemComponent } from './nhan-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nhan',
  standalone: true,
  imports: [
    CommonModule,
    NhanItemComponent
  ],
  template: `
    <div class="container nhan px-0 shadow-sm d-flex flex-wrap justify-content-between" >
      <nhan-item *ngFor="let thuaso1 of thuaso1_list; index as j"
        [thuaso1]="thuaso1"
        [thuaso2]="thuaso2_list[j]"
      ></nhan-item>
    </div>
  `,
  styleUrl: './nhan.component.css'
})
export class NhanComponent {
  @Input() thuaso1_list: number[] = []
  @Input() thuaso2_list: number[] = []
}

import { Component, Input } from '@angular/core';
import { NhanItemComponent } from './nhan-item.component';
import { CommonModule } from '@angular/common';
import { WorkInterface } from '../../../shared/interface/workinterface';

@Component({
  selector: 'nhan',
  standalone: true,
  imports: [
    CommonModule,
    NhanItemComponent
  ],
  template: `
    <div class="container nhan px-0 shadow-sm d-flex flex-wrap justify-content-between" >
      <nhan-item *ngFor="let work of works; index as j"
        [thuaso1]="work.x"
        [thuaso2]="work.y"
        [id]="j"
      ></nhan-item>
    </div>
  `,
  styleUrl: './nhan.component.css'
})
export class NhanComponent {  
  @Input() works: WorkInterface[] = []
}

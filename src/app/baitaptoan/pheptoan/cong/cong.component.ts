import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CongItemComponent } from './cong-item.component';
import { WorkInterface } from '../../../shared/interface/workinterface';

@Component({
  selector: 'cong',
  standalone: true,
  imports: [
    CommonModule,
    CongItemComponent
  ],
  template: `
    <div class="container cong px-0 shadow-sm d-flex flex-wrap justify-content-between" >
      <cong-item *ngFor="let work of works; index as j"
        [sohang1]="work.x"
        [sohang2]="work.y"
        [id]="j"
      ></cong-item>
    </div>
  `,
  styleUrl: './cong.component.css'
})
export class CongComponent { 
  @Input() works: WorkInterface[] = []
}

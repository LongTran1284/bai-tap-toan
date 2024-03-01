import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TruItemComponent } from './tru-item.component';
import { WorkInterface } from '../../../shared/interface/workinterface';

@Component({
  selector: 'tru',
  standalone: true,
  imports: [
    CommonModule, TruItemComponent
  ],
  template: `
    <div class="container tru px-0 shadow-sm d-flex flex-wrap justify-content-between" >
      <tru-item *ngFor="let work of works; index as j"
        [sobitru]="work.x"
        [sotru]="work.y"
        [id]="j"
      ></tru-item>
    </div>
  `,
  styleUrl: './tru.component.css'
})
export class TruComponent {  
  @Input() works: WorkInterface[] = []
}

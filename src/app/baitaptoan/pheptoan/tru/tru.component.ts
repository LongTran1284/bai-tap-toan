import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TruItemComponent } from './tru-item.component';

@Component({
  selector: 'tru',
  standalone: true,
  imports: [
    CommonModule, TruItemComponent
  ],
  template: `
    <div class="container tru px-0 shadow-sm d-flex flex-wrap justify-content-between" >
      <tru-item *ngFor="let sobitru of sobitru_list; index as j"
        [sobitru]="sobitru"
        [sotru]="sotru_list[j]"
      ></tru-item>
    </div>
  `,
  styleUrl: './tru.component.css'
})
export class TruComponent {
  @Input() sobitru_list: number[] = []
  @Input() sotru_list: number[] = []
}

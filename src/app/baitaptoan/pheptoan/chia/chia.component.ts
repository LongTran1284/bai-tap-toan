import { Component, Input } from '@angular/core';
import { ChiaItemComponent } from './chia-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chia',
  standalone: true,
  imports: [
    CommonModule,    
    ChiaItemComponent
  ],
  template: `
    <div class="container chia px-0 shadow-sm d-flex flex-wrap justify-content-between" >
      <chia-item *ngFor="let sobichia of sobichia_list; index as j"
        [sobichia]="sobichia"
        [sochia]="sochia_list[j]"
      ></chia-item>
    </div>
  `,
  styleUrl: './chia.component.css'
})
export class ChiaComponent {
  @Input() sobichia_list: number[] = []
  @Input() sochia_list: number[] = []

  
}

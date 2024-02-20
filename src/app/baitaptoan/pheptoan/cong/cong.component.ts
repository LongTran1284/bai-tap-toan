import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CongItemComponent } from './cong-item.component';

@Component({
  selector: 'cong',
  standalone: true,
  imports: [
    CommonModule,
    CongItemComponent
  ],
  template: `
    <div class="container cong px-0 shadow-sm d-flex flex-wrap justify-content-between" >
      <cong-item *ngFor="let sohang1 of sohang1_list; index as j"
        [sohang1]="sohang1"
        [sohang2]="sohang2_list[j]"
      ></cong-item>
    </div>
  `,
  styleUrl: './cong.component.css'
})
export class CongComponent {
  @Input() sohang1_list: number[] = []
  @Input() sohang2_list: number[] = []
}

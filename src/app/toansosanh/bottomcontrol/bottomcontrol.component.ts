import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClearComponent } from '../../baitaptoan/clear/clear.component';

@Component({
  selector: 'bottomcontrol',
  standalone: true,
  imports: [
    ClearComponent
  ],
  template: `
    <div class="d-flex flex-grow-1 flex-column justify-content-center align-items-center">
      <div class="btn-group mb-2">
        <button class="btn ani btn-success " (click)="smaller()"><</button>
        <button class="btn ani btn-success " (click)="equal()">=</button>
        <button class="btn ani btn-success " (click)="bigger()">></button>
      </div>
      <div class="w-100">
      <clear [style]="clear_style"
          [value]="pass" (btn_click)="clearTinhToan()"
      ></clear>         
      </div>
    </div>
  `,
  styleUrl: './bottomcontrol.component.css'
})
export class BottomControlComponent {
  @Input() pass: boolean = false
  clear_style: string = 'justify-content: space-around'
  @Output() smaller_click = new EventEmitter()
  @Output() bigger_click = new EventEmitter()
  @Output() equal_click = new EventEmitter()
  @Output() clear_click = new EventEmitter()

  smaller(){
    this.smaller_click.emit('<')
  }

  equal(){
    this.equal_click.emit('=')
  }

  bigger(){
    this.bigger_click.emit('>')
  }

  clearTinhToan(){
    this.clear_click.emit()
  }
}

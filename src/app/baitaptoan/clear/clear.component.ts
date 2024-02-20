import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'clear',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <article [style]="style">
      <button class="btn" (click)="btnClick()">Xóa</button>
      <input type="checkbox" class="form-check-input checkbox-lg" [(ngModel)]="value" (click)="onClick()" disabled>
    </article>
  `,
  styleUrl: './clear.component.css'
})
export class ClearComponent {
  @Output() on_click = new EventEmitter()
  @Output() btn_click = new EventEmitter()
  
  @Input() value: boolean = false;
  @Input() style!: string;
  @Input() checked: boolean = false


  onClick(){
    this.on_click.emit()
  }

  btnClick(){
    this.btn_click.emit()
  }
}

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'btn-group',
  standalone: true,
  imports: [],
  template: `
  <div class="row h-100"> 
    <div class="col-6 btn-group-vertical">
        <button class="btn ani btn-secondary " (click)="unDo()">Undo</button>
        <button class="btn ani btn-danger " (click)="clearAll()">Clear All</button>
    </div>
    <button class="col-6 btn ani btn-primary" (click)="onClick()">Generate <br> number</button>
  </div>
  `,
  styleUrl: './btn-group.component.css'
})
export class BtnGroupComponent {
  @Output() generate_click = new EventEmitter();
  @Output() clearall_click = new EventEmitter();
  @Output() undo_click = new EventEmitter();
  @Output() radio_change = new EventEmitter();

  onClick(){
    this.generate_click.emit()
  }

  unDo(){
    this.undo_click.emit()
  }
  clearAll(){
    this.clearall_click.emit()
  }
}

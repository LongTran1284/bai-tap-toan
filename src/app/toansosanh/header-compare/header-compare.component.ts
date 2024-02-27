import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sosanh-header',
  standalone: true,
  imports: [FormsModule],
  template: `
  <div class="container shadow-sm px-3">
    <div class="row">
      <div class="col-5">        
        <div >
          <span class="left" [style.width.px]="100">
           Số chữ số <span>:</span> 
          </span>
          <input           
            name="num1" type="number" min="1"
            [(ngModel)]="num"
          >
        </div>                
        <div>
          <span class="left" [style.width.px]="100">
          Số lượng bài <span>:</span> 
          </span>
          <input 
            type="number" min="1"
            [(ngModel)]="sobai">
        </div>        
        
      </div>

      <div class="col-3 ">
        <div>Cấp độ:</div>
        <input type="radio" class="btn-check" name="level" id="simple" 
        value="simple" (change)="onChange($event)" [checked]="level==='simple'" >
        <label class="btn btn-outline-success w-60"  for='simple'>Đơn giản</label>
        
        <input type="radio" class="btn-check" name="level" id="complex" 
        value="complex" (change)="onChange($event)" [checked]="level==='complex'">
        <label class="btn btn-outline-success w-60"  for='complex'>Phức tạp</label>
      </div>
      
      <div class="col-4">
      <div class="row h-100">      
        <div class="col-6 btn-group-vertical">
          <button class="btn ani btn-secondary " (click)="unDo()">Undo</button>
          <button class="btn ani btn-danger " (click)="clearAll()">Clear All</button>
        </div>
        <button class="col-6 btn ani btn-primary" (click)="onClick()">Generate <br> number</button>
      </div>
      </div>
    </div>
    <div class="row">
      <ng-content></ng-content>
    </div>
    
  </div>
  `,
  styleUrl: './header-compare.component.css'
})
export class HeaderComponent {
  num: number = 5
  sobai: number = 6
  @Output() generate_click = new EventEmitter();
  @Output() clearall_click = new EventEmitter();
  @Output() undo_click = new EventEmitter();
  @Output() radio_change = new EventEmitter();

  @Input() level: string = 'simple';

  onClick(){
    this.generate_click.emit([this.num, this.sobai])
  }

  onChange(e: any){
    this.radio_change.emit(e.target.value)
  }

  unDo(){
    this.undo_click.emit()
  }
  clearAll(){
    this.clearall_click.emit()
  }
}

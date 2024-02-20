import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, FormsModule
  ],
  template: `
  <div class="container shadow-sm px-3">
    <div class="row">
      <div class="col-5">        
        <div >
          <span class="left" [style.width.px]="texts[pheptoan]['width']">
           {{ texts[pheptoan]['text1'] }} <span>:</span> 
          </span>
          <input           
            name="num1" type="number" min="1"
            [(ngModel)]="settings[pheptoan]['num1']">
          <span>chữ số</span>
        </div>

        <div >
          <span class="left" [style.width.px]="texts[pheptoan]['width']">
          {{ texts[pheptoan]['text2'] }} <span>:</span> 
          </span>
          <input             
            type="number" min="1"
            [(ngModel)]="settings[pheptoan]['num2']">
          <span>chữ số</span>
        </div>
        
        <div>
          <span class="left" [style.width.px]="texts[pheptoan]['width']">
          Số lượng bài <span>:</span> 
          </span>
          <input 
            type="number" min="1"
            [(ngModel)]="settings[pheptoan]['sl']">
          <span>bài</span>
        </div>        
      </div>

      <div class="col-3 ">
      <!-- d-flex flex-column justify-content-evenly flex-fill -->
          <div class="d-flex justify-content-center h-50 ">          
            <input type="radio" class="btn-check" name="pheptoan" id="nhan" 
            value="nhan" (change)="onChange($event)" [checked]="pheptoan==='nhan'" >
            <label class="btn btn-outline-success w-60" style="width: 70px" for='nhan'>Nhân</label>
            
            <input type="radio" class="btn-check" name="pheptoan" id="chia" 
            value="chia" (change)="onChange($event)" [checked]="pheptoan==='chia'">
            <label class="btn btn-outline-success w-60" style="width: 70px" for='chia'>Chia</label>
          </div>

          <div class="d-flex justify-content-center h-50">          
            <input type="radio" class="btn-check" name="pheptoan" id="cong" 
            value="cong" (change)="onChange($event)" [checked]="pheptoan==='cong'">
            <label class="btn btn-outline-success w-60" style="width: 70px" for='cong'>Cộng</label>

            <input type="radio" class="btn-check" name="pheptoan" id="tru" 
            value="tru" (change)="onChange($event)" [checked]="pheptoan==='tru'">
            <label class="btn btn-outline-success w-60" style="width: 70px" for='tru'>Trừ</label>
          </div>
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
  </div>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() generate_click = new EventEmitter();
  @Output() clearall_click = new EventEmitter();
  @Output() undo_click = new EventEmitter();
  @Output() radio_change = new EventEmitter();

  @Input() pheptoan: string = 'nhan';
  settings: any = {
    nhan: {num1: 4, num2: 1, sl: 8},
    chia: {num1: 4, num2: 1, sl: 5},
    cong: {num1: 4, num2: 4, sl: 8},
    tru: {num1: 4, num2: 3, sl: 9}
  }
  // num1!: number 
  // num2!: number 
  // soluongbai: number = 6;
  
  texts: any = {
    nhan: {text1: 'Thừa số thứ nhất có', text2: 'Thừa số thứ hai có', width: 156},
    chia: {text1: 'Số bị chia có', text2: 'Số chia có', width: 105},
    cong: {text1: 'Số hạng thứ nhất có', text2: 'Số hạng thứ hai có', width: 156},
    tru: {text1: 'Số bị trừ có', text2: 'Số trừ có', width: 105}
  } 
  

  onClick() {
    this.generate_click.emit([
      this.settings[this.pheptoan]['num1'], 
      this.settings[this.pheptoan]['num2'], 
      this.settings[this.pheptoan]['sl']
    ])
  }

  unDo(){
    this.undo_click.emit()
  }
  clearAll(){
    this.clearall_click.emit()
  }

  onChange(e: any){
    this.radio_change.emit(e.target.value)
  }
}

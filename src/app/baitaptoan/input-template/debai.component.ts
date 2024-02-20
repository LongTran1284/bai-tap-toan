import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RandomService } from '../../services/random.service';

@Component({
  selector: 'debai',
  standalone: true,
  imports: [
    CommonModule, FormsModule
  ],
  template: `
    <div class="m-1 d-flex " >
        <div *ngFor="let item of num_list, index as i">
            <input type='text' class="nhaplieu khac" 
              [ngModel]="item" 
              (ngModelChange)="onChange($event, i)"
              (keypress)="stripText($event)"
            >
            <!-- readonly -->
        </div>
    </div>
  `,
  styleUrl: './input-template.component.css'
})
export class DebaiComponent {
    @Input() num!: number
    @Output() on_change = new EventEmitter()

    num_list: any[] = []

    constructor(private random: RandomService){}

    ngOnInit(){
        this.num_list = this.random.convertList(this.num)
    }

    onChange(value: any, pos: number){
      this.num_list[pos] = value
      // console.log(value, this.num_list)
      this.on_change.emit(Number(this.num_list.join('')))
    }

    stripText(event: any) {
      const seperator  = '^([0-9])';
      const maskSeperator =  new RegExp(seperator , 'g');  
      let result =maskSeperator.test(event.key);   
      // console.log('result:', result, 'event:', event)
      return result;   
    }
}

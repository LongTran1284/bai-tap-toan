import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { RandomService } from '../../services/random.service';

@Component({
  selector: 'tinhtoan',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="form_group" (ngSubmit)="$event.preventDefault();toParent()">
      <div class="m-1 d-flex">
        <div *ngFor="let item of num_list, index as j">
          <input type='text' class="nhaplieu khac" 
            formControlName="value_{{j}}" 
            (ngModelChange)="toParent()"
            (keypress)="stripText($event)"
            (focus)="selectOnFocus($event)" 
          >
        </div>
      </div>
    </form>
  `,
  styleUrl: './input-template.component.css'
})
export class TinhtoanComponent {
  @Input() num!: number
  @Output() sendFormGroup = new EventEmitter()
  form_group!: FormGroup

  num_list: any[] = []
  

  constructor(private random: RandomService){}

  ngOnInit(){
      this.num_list = this.random.convertNullList(this.num)

      let form_control: any = {}        
      for (let j=0; j<this.num_list.length; j++){
          form_control[`value_${j}`] = new FormControl()
      }
    
      this.form_group = new FormGroup(form_control)
      // console.log(this.form_group)
      
  }

  stripText(event: any) {
    const seperator  = '^([0-9])';
    const maskSeperator =  new RegExp(seperator , 'g');  
    let result =maskSeperator.test(event.key);   
    // console.log('result:', result, 'event:', event)
    return result;   
  }

  selectOnFocus(event: any){
    event.target.select()
  }


  toParent(){
    this.sendFormGroup.emit(this.form_group)
  }
}

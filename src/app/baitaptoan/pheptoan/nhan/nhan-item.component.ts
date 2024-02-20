import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DebaiComponent } from '../../input-template/debai.component';
import { TinhtoanComponent } from '../../input-template/tinhtoan.component';
import { CommonModule } from '@angular/common';
import { ClearComponent } from '../../clear/clear.component';

@Component({
  selector: 'nhan-item',
  standalone: true,
  imports: [
    CommonModule,
    DebaiComponent, TinhtoanComponent, ClearComponent
  ],
  template: `
    <div class=" p-2  shadow-sm mb-5 mx-3 rounded">
        <div class=" d-flex align-items-center justify-content-end">
            <div class="">x</div>
            <div class="">
                <div class="d-flex justify-content-end">
                    <debai [num]="thuaso1" (on_change)="thuaso1=$event"></debai>
                </div>
                <div class=" d-flex justify-content-end">
                    <debai [num]="thuaso2" (on_change)="thuaso2=$event"></debai>
                </div>
            </div>
        </div>
        <hr class="border border-dark mx-0 my-0">
        <div *ngFor="let loop of counter(step), index as i">
            <hr class="border border-dark mx-0 my-0" *ngIf="i > 0 && i === step - 1">
            <div class="d-flex justify-content-end" >                
                <tinhtoan [num]="num_len + i" (sendFormGroup)="i === step - 1 ? getResult($event) : collectForm($event, i)"></tinhtoan>
            </div>
        </div>
        <div class="m-2">
            <clear 
                [value]="pass" (btn_click)="clearTinhToan()"
            ></clear> 
        </div>
    </div>
  `,
  styleUrl: './nhan.component.css'
})
export class NhanItemComponent {
    @Input() thuaso1!: number;
    @Input() thuaso2!: number;

    step: number = 1;
    num_len: number = 1
    counter = Array;
    pass: boolean = false;    
    form_groups: any[] = []
    resultForm = new FormGroup({})
       
    ngOnInit(){
        let s1 = this.thuaso1.toString().length, s2 = this.thuaso2.toString().length
        this.num_len = Math.max(s1, s2) + 1        
        s2 > 1 ? this.step = s2 + 1 : 1
    }
        
    clearTinhToan(){               
        this.form_groups.forEach(group => group.reset())    
        this.resultForm.reset()
        this.pass = false     
    }

    collectForm(form: FormGroup, pos: number){
        if (this.form_groups.length === pos){
            this.form_groups.push(form)
        }        
    }

    getResult(form: FormGroup){
        this.resultForm = form  // in order to clear it        

        // check result also:
        let form_dict = form.value
        let values = Object.values(form_dict).join('')
        let result = this.thuaso1 * this.thuaso2
        if (Number(values) === result){
            this.pass = true
        } else {
            this.pass = false
        }      
    }    
}

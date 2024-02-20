import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClearComponent } from '../../clear/clear.component';
import { DebaiComponent } from '../../input-template/debai.component';
import { TinhtoanComponent } from '../../input-template/tinhtoan.component';



@Component({
  selector: 'chia-item',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    ReactiveFormsModule,
    ClearComponent,
    DebaiComponent,
    TinhtoanComponent
  ],
  template: `
    <div class="row  p-2 shadow-sm mb-5 mx-3 rounded" >
        <div class="col-auto p-0 border-end border-dark">
            <debai [num]="sobichia" (on_change)="sobichia=$event; calcResult()"></debai>
            <hr class="invisible border border-dark mx-0 my-0">
            <div *ngFor="let loop of counter(step), index as i">
                <tinhtoan [num]="num_len" (sendFormGroup)="collectForm(form_groups, $event, i)"></tinhtoan>
                <hr class="border border-dark mx-0 my-0">
                <tinhtoan [num]="num_len" (sendFormGroup)="collectForm(form_groups_B, $event, i); checkResult(i)"></tinhtoan>
            </div>
        </div>
        <div class="col-auto p-0 d-flex flex-column">
            <debai [num]="sochia" (on_change)="sochia=$event; calcResult()"></debai>            
            <hr class="border border-dark mx-0 my-0">
            <tinhtoan [num]="num_len" (sendFormGroup)="getResult($event)"></tinhtoan>
            
            <div class="d-flex flex-grow-1 justify-content-center align-items-center">
                <clear [style]="pass_style"
                    [value]="pass" (btn_click)="clearTinhToan()"
                ></clear>         
            </div>
        </div>
    </div>
  `,
  styleUrl: './chia.component.css'
})
export class ChiaItemComponent {
    @Input() sobichia!: number;
    @Input() sochia!: number;

    step: number = 1;
    num_len: number = 1
    counter = Array;
    pass: boolean = false;    
    pass_style: string = 'flex-direction: column; min-height: 70px'
    form_groups: any[] = []
    form_groups_B: any[] = []
    resultForm = new FormGroup({})
    
    value_abs: number = 0
    value_remain: number = 0
    result: number = 0       
    sole: number = 0
    pass_pos!: any // the position get the pass=true
       

    ngOnInit(){
        this.num_len = this.sobichia.toString().length
        this.step = this.num_len- this.sochia.toString().length + 1;
      
        this.calcResult()
    }

    
    calcResult(){
        this.result = Math.floor(this.sobichia / this.sochia)        
        this.sole = this.sobichia - this.sochia * this.result
    }
        
    clearTinhToan(){               
        this.form_groups.forEach(group => group.reset()) 
        this.form_groups_B.forEach(group => group.reset())       
        this.resultForm.reset()
        this.pass = false 
        this.pass_pos = undefined
        this.form_groups_B = []
    }

    collectForm(group: any[], form: FormGroup, pos: number){
        if (group.length === pos){
            group.push(form)
        }        
    }

    getResult(form: FormGroup){
        this.resultForm = form  // in order to clear it
        this.value_abs = Number(Object.values(form.value).join(''))
        if (this.form_groups_B.length){this.checkResult(0)}
    }    

    checkResult(pos: number){
        let last_pos: number
        if (this.pass_pos){
            last_pos = this.pass_pos
        } else {
            last_pos = this.form_groups_B.length - 1
        }

        let last_form = this.form_groups_B[last_pos]
        // console.log('pos:', pos, 'pass_pos:', this.pass_pos, this.pass, this.form_groups_B.length)

        if (this.pass && pos > this.pass_pos){return}

        this.value_remain = Number(Object.values(last_form.value).join(''))

        if (this.value_abs === this.result && this.value_remain === this.sole){
            this.pass = true
            if (!this.pass_pos) {this.pass_pos = pos}
        } else {
            this.pass = false
            // this.pass_pos = undefined
        }    
    }
}

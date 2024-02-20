import { Component, Input } from '@angular/core';
import { DebaiComponent } from '../../input-template/debai.component';
import { TinhtoanComponent } from '../../input-template/tinhtoan.component';
import { ClearComponent } from '../../clear/clear.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cong-item',
  standalone: true,
  imports: [
    DebaiComponent, TinhtoanComponent, ClearComponent
  ],
  template: `
    <div class=" p-2 shadow-sm mb-5 mx-3 rounded">
        <div class=" d-flex align-items-center justify-content-end">
            <div class="">+</div>
            <div class="">
                <div class="d-flex justify-content-end">
                    <debai [num]="sohang1" (on_change)="sohang1=$event"></debai>
                </div>
                <div class=" d-flex justify-content-end">
                    <debai [num]="sohang2" (on_change)="sohang2=$event"></debai>
                </div>
            </div>
        </div>
        <hr class="border border-dark mx-0 my-0">        
        <div class="d-flex justify-content-end" >                
            <tinhtoan [num]="num_len" (sendFormGroup)="getResult($event)"></tinhtoan>
        </div>
        <div class="m-2">
            <clear 
                [value]="pass" (btn_click)="clearTinhToan()" 
            ></clear> 
        </div>
    </div>
  `,
  styleUrl: './cong.component.css'
})
export class CongItemComponent {
    @Input() sohang1!: number
    @Input() sohang2!: number

    num_len: number = 1
    pass: boolean = false;    
    resultForm = new FormGroup({})
        
    ngOnInit(){
        let s1 = this.sohang1.toString().length, s2 = this.sohang2.toString().length
        this.num_len = Math.max(s1, s2) + 1        
    }    
        
    clearTinhToan(){         
        this.resultForm.reset()
        this.pass = false                    
    }

    getResult(form: FormGroup){
        this.resultForm = form  // in order to clear it

        // check result also:
        let form_dict = form.value
        let values = Object.values(form_dict).join('')
        let result = this.sohang1 + this.sohang2
        if (Number(values) === result){
            this.pass = true
        } else {
            this.pass = false
        }      
    }    
}

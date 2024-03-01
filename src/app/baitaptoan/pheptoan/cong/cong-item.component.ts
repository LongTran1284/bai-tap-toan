import { Component, Input } from '@angular/core';
import { DebaiComponent } from '../../input-template/debai.component';
import { TinhtoanComponent } from '../../input-template/tinhtoan.component';
import { ClearComponent } from '../../clear/clear.component';
import { FormGroup } from '@angular/forms';
import { EventService } from '../../../services/EventService';

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
    @Input() id: number = 0

    num_len: number = 1
    pass: boolean = false;
    clear: boolean = false;    
    resultForm = new FormGroup({})

    constructor(private eventService: EventService){}
        
    ngOnInit(){
        let s1 = this.sohang1.toString().length, s2 = this.sohang2.toString().length
        this.num_len = Math.max(s1, s2) + 1        
    }    
        
    clearTinhToan(){         
        if (this.pass){this.eventService.emitt('updateToanTinh', {id: this.id, pass: false})}
        this.clear = true
        // do not check result when click clear button
        this.resultForm.reset()
        this.pass = false   
        this.clear = false                 
    }

    getResult(form: FormGroup){
        this.resultForm = form  // in order to clear it

        // check result also:
        if (!this.clear){
            let form_dict = form.value
            let values = Object.values(form_dict).join('')
            let result = this.sohang1 + this.sohang2
            if (Number(values) === result){
                this.pass = true
                this.eventService.emitt('updateToanTinh', {id: this.id, pass: true})
            } else {
                if (this.pass){this.eventService.emitt('updateToanTinh', {id: this.id, pass: false})}
                this.pass = false
            }      
        }
        
    }    
}

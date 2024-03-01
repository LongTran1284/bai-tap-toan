import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DebaiComponent } from '../../input-template/debai.component';
import { TinhtoanComponent } from '../../input-template/tinhtoan.component';
import { ClearComponent } from '../../clear/clear.component';
import { EventService } from '../../../services/EventService';

@Component({
  selector: 'tru-item',
  standalone: true,
  imports: [
    DebaiComponent, TinhtoanComponent, ClearComponent
  ],
  template: `
    <div class=" p-2 shadow-sm mb-5 mx-3 rounded" style="min-width: 80px;">
        <div class=" d-flex align-items-center justify-content-end">
            <div class="">-</div>
            <div class="">
                <div class="d-flex justify-content-end">
                    <debai [num]="sobitru" (on_change)="sobitru=$event"></debai>
                </div>
                <div class=" d-flex justify-content-end">
                    <debai [num]="sotru" (on_change)="sotru=$event"></debai>
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
  styleUrl: './tru.component.css'
})
export class TruItemComponent {
    @Input() sobitru!: number
    @Input() sotru!: number
    @Input() id: number = 0

    num_len: number = 1
    pass: boolean = false;    
    resultForm = new FormGroup({})
    clear: boolean = false
    
    constructor(private eventService: EventService){}

    ngOnInit(){
        this.num_len = this.sobitru.toString().length     
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
            let form_dict = this.resultForm.value
            let values = Object.values(form_dict).join('')            
            let result = this.sobitru - this.sotru
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

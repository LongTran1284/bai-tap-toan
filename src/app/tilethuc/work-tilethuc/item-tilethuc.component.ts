
import { Component, Input } from '@angular/core';
import { WorkInterface } from '../workinterface'; 
import { ClearComponent } from '../../baitaptoan/clear/clear.component';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/EventService';

@Component({
  selector: 'item-tilethuc',
  standalone: true,
  imports: [
    FormsModule,
    ClearComponent
  ],
  template: `
    <div class="p-2 shadow-sm mb-5 mx-3 rounded">  
        <div class="d-flex align-items-center p-2 border rounded ">
            <div class=" px-1 d-flex align-items-center ">
                {{ item.pheptinh }}
            </div>
            <div class=" px-2 d-flex align-items-center ">
                và
            </div>
            <div class=" px-1 d-flex align-items-center ">
                <div class="frac">
                    <span>x</span>
                    <span class="symbol">/</span>
                    <span class="bottom">y</span>                
                </div>
                <div class="px-1">=</div> 
                <div class="frac">
                    <span>{{ item.phanso_x }}</span>
                    <span class="symbol">/</span>
                    <span class="bottom">{{ item.phanso_y }}</span>                
                </div>
            </div>            
        </div>
        <div class="my-2 p-2 border rounded ">
            <div>Kết quả:</div>
            <div class="d-flex align-items-center justify-content-between ">
                <div>x = <input type="text" class="ketqua" [(ngModel)]="x_value" (ngModelChange)="checkResult()"></div>
                <div>y = <input type="text" class="ketqua" [(ngModel)]="y_value" (ngModelChange)="checkResult()"></div>
            </div>
        </div>
        <div class="my-2">
            <clear 
                [value]="pass" (btn_click)="clearTinhToan()"
            ></clear> 
        </div>
    </div>
  `,
  styleUrl: './work-tilethuc.component.css'
})
export class ItemTilethucComponent {
    @Input() item!: WorkInterface 
    pass: boolean = false
    x_value!: string
    y_value!: string

    constructor(private eventService: EventService){
    }

    clearTinhToan(){
        if (this.pass){this.eventService.emitt('updateTiLeThuc', -1)}
        this.pass = false
        this.x_value = ''
        this.y_value = ''
    }

    checkResult(){
        if (parseInt(this.x_value) === this.item.x && parseInt(this.y_value) === this.item.y){
            this.pass = true
            this.eventService.emitt('updateTiLeThuc', 1)
        } else {
            if (this.pass){this.eventService.emitt('updateTiLeThuc', -1)}
            this.pass = false
            
        }
    }
}

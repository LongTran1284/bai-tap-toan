import { Component, Input } from '@angular/core';
import { BottomControlComponent } from '../bottomcontrol/bottomcontrol.component';
import { RandomService } from '../../services/random.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/EventService';

@Component({
  selector: 'simple-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BottomControlComponent
  ],
  template: `
    <div class="  p-2 shadow-sm mb-5 mx-3 rounded" >
        <div class="d-flex align-items-center justify-content-center mb-2">
            <div class="mx-2">{{ num1 }}</div>
            <input type="text" class="nhaplieu" [(ngModel)]="value" readonly>
            <div class="mx-2">{{ num2 }}</div>
        </div>
        <bottomcontrol
            (smaller_click)="makeCompare($event)"
            (bigger_click)="makeCompare($event)"
            (equal_click)="makeCompare($event)"
            (clear_click)="clearCompare()"
            [pass]="pass"
        ></bottomcontrol>
    </div>
  `,
  styleUrl: './simple-compare.component.css'
})
export class SimpleItemComponent {
    value: string = ''
    pass: boolean = false
    @Input() num1: number = 0
    @Input() num2: number = 0
    @Input() id: number = 0

    constructor(private eventService: EventService){}

    
    makeCompare(value: string){
        this.value = value
        let result: string
        if (this.num1 < this.num2){
            result = '<'
        } else if (this.num1 > this.num2){
            result = '>'
        } else {
            result = '='
        }

        if (value===result){
            this.pass = true
            this.eventService.emitt('updateSoSanh', {id: this.id, pass: true})
        } else {
            if (this.pass){this.eventService.emitt('updateSoSanh', {id: this.id, pass: false})}
            this.pass=false
        }
        
    }

    clearCompare(){
        if (this.pass){this.eventService.emitt('updateSoSanh', {id: this.id, pass: false})}
        this.value = ''
        this.pass = false
    }
}

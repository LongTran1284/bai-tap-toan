import { Component, Input } from '@angular/core';
import { BottomControlComponent } from '../bottomcontrol/bottomcontrol.component';
import { FormsModule } from '@angular/forms';
import { RandomService } from '../../services/random.service';

import { CongItemComponent } from '../../baitaptoan/pheptoan/cong/cong-item.component';
import { TruItemComponent } from '../../baitaptoan/pheptoan/tru/tru-item.component';
import { CommonModule } from '@angular/common';
import { NhanItemComponent } from '../../baitaptoan/pheptoan/nhan/nhan-item.component';
import { ChiaItemComponent } from '../../baitaptoan/pheptoan/chia/chia-item.component';

interface valItem {
    text: string,
    cal: string,
    num1: number,
    num2: number
}

@Component({
  selector: 'complex-item',
  standalone: true,
  imports: [
    FormsModule, CommonModule,
    BottomControlComponent,
    CongItemComponent,
    TruItemComponent,
    NhanItemComponent,
    ChiaItemComponent
  ],
  template: `
    <div class="  p-2 shadow-sm mb-5 mx-3 rounded" >
        <!-- <div class="d-flex align-items-center justify-content-center mb-2">
            <div class="mx-2 btn" (click)="showCalculator(val1)">{{ val1['text'] }}</div>
            <input type="text" class="nhaplieu" [(ngModel)]="value" readonly>
            <div class="mx-2 btn" (click)="showCalculator(val2)">{{ val2['text'] }}</div>
        </div> -->
        <div class="row">
            <div class="col-auto p-0">
                <div class="mx-2 btn" (click)="pheptoan1=val1['cal']">{{ val1['text'] }}</div>
                <div *ngIf="pheptoan1==='cong'">
                    <cong-item 
                        [sohang1]="val1['num1']"
                        [sohang2]="val1['num2']"
                    ></cong-item>
                </div>
                <div *ngIf="pheptoan1==='tru'">
                    <tru-item 
                        [sobitru]="val1['num2']"
                        [sotru]="val1['num1']"
                    ></tru-item>
                </div>
                <div *ngIf="pheptoan1==='nhan'">
                    <nhan-item 
                        [thuaso1]="val1['num1']"
                        [thuaso2]="val1['num2']"
                    ></nhan-item>
                </div>
                <div *ngIf="pheptoan1==='chia'">
                    <chia-item 
                        [sobichia]="val1['num2']"
                        [sochia]="val1['num1']"
                    ></chia-item>
                </div>
            </div>
            <div class="col-auto p-0">
                <input type="text" class="nhaplieu" [(ngModel)]="value" readonly>
            </div>
            <div class="col-auto p-0">
                <div class="mx-2 btn" (click)="pheptoan2=val2['cal']">{{ val2['text'] }}</div>
                <div *ngIf="pheptoan2==='cong'">
                    <cong-item 
                        [sohang1]="val2['num1']"
                        [sohang2]="val2['num2']"
                    ></cong-item>
                </div>
                <div *ngIf="pheptoan2==='tru'">
                    <tru-item 
                        [sobitru]="val2['num2']"
                        [sotru]="val2['num1']"
                    ></tru-item>
                </div>
                <div *ngIf="pheptoan2==='nhan'">
                    <nhan-item 
                        [thuaso1]="val2['num1']"
                        [thuaso2]="val2['num2']"
                    ></nhan-item>
                </div>
                <div *ngIf="pheptoan2==='chia'">
                    <chia-item 
                        [sobichia]="val2['num2']"
                        [sochia]="val2['num1']"
                    ></chia-item>
                </div>
            </div>
        </div>
        <div></div>
        <bottomcontrol
            (smaller_click)="makeCompare($event)"
            (bigger_click)="makeCompare($event)"
            (equal_click)="makeCompare($event)"
            (clear_click)="clearCompare()"
            [pass]="pass"
        ></bottomcontrol>
    </div>
  `,
  styleUrl: './complex-compare.component.css'
})
export class ComplexItemComponent {
    value: string = ''
    pass: boolean = false
    @Input() num1: number = 0
    @Input() num2: number = 0

    
    val1: any = {}
    val2: any = {}
    pheptoan1: string = ''
    pheptoan2: string = ''

    constructor(private random: RandomService){}

    ngOnInit(){
        this.val1 = this.createVal(this.num1)
        this.val2 = this.createVal(this.num2)        
        // console.log('this.val1:', this.val1, "this.val2:", this.val2)
    }

    createVal(num: number){
        // let pheptoan: string = this.random.randomValue(['cong', 'tru', 'nhan', 'chia'])
        let pheptoan: string = this.random.randomValue(['cong', 'tru'])
        let val1: number = this.random.ranum(1, num)
        let val2: number
        let val: string
        // let cal: string
        if (pheptoan==='cong'){
            val2 = num - val1
            val = `${val1} + ${val2}`
            // cal = '+'
        } else if (pheptoan==='tru'){
            val2 = num + val1
            val = `${val2} - ${val1}`
            // cal = '-'
        } else {
            val2 = val1
            val = ''
            // cal = ''
        }

        let mydict: valItem = {text: val, cal: pheptoan, num1: val1, num2: val2}

        return mydict
    }

    showCalculator(e: any){
        console.log(e)
    }

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
        } else (this.pass=false)
        
    }

    clearCompare(){
        this.value = ''
        this.pass = false
    }
}

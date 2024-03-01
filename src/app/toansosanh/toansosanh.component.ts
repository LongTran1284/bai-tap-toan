import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/EventService';
import { HeaderComponent } from './header-compare/header-compare.component';
import { SimpleCompareComponent } from './simple-compare/simple-compare.component';
import { RandomService } from '../services/random.service';
import { ComplexCompareComponent } from './complex-compare/complex-compare.component';
import { CommonModule } from '@angular/common';
import { UndoInterface } from '../shared/interface/undointerface';
import { WorkInterface } from '../shared/interface/workinterface';

@Component({
  selector: 'toansosanh',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent, SimpleCompareComponent, ComplexCompareComponent
  ],
  template: `
    <div class="container-fluid p-3 shadow mb-5 bg-body rounded">
      <div class="mb-3">
        <sosanh-header
          (generate_click)="createNumList($event)"
          (clearall_click)="clearAll()"
          (undo_click)="undo_click()"
          [level]="level"
          (radio_change)="level = $event; complete = 0"
        >
          <div class="my-3 ">Hoàn thành: {{ complete }}/{{ total }}</div>
        </sosanh-header>        
      </div>
      <div class="mt-3">      
        <div *ngIf="level==='simple'">
          <simple-compare            
            [works]="values"
          ></simple-compare>
        </div>
        <div *ngIf="level==='complex'">
          <complex-compare            
            [works]="values"
          ></complex-compare>
        </div>
      </div>
    </div>
    
  `,
  styleUrl: './toansosanh.component.css'
})
export class ToansosanhComponent {  
  level: string = 'complex'
  complete: number = 0
  total: number = 0
  undo_list: UndoInterface[] = []
  undo_complete: number[] = []
  values: WorkInterface[] = []
  
  constructor(
    private route: ActivatedRoute, 
    private eventService: EventService,
    private random: RandomService
    ){
    this.eventService.emitt('updateTitle', this.route.snapshot.title)
    this.eventService.listen('updateSoSanh', (comp: any)=> {
      if (comp.pass){
        this.complete++
        this.undo_complete.push(comp.id)
      } else {
        this.complete-- ;
        let index = this.undo_complete.indexOf(comp.id)
        this.undo_complete.splice(index, 1)
      }
    })
  }



  createNumList(num: number[]){
    for (let x=0; x < num[1]; x++) {        
      let num1: number = this.random.generateRandom(num[0])
      let num2: number       
      let tinh = this.random.randomValue(['+', '-'])
      if (num[0] > 1){
        let pow = this.random.ranum(1, num[0]-1)
        let max: number = Math.pow(10, pow)
        let ran: number = this.random.ranum(0, max)
        // console.log(pow, max, ran, num[0])
        if (tinh==='+'){
          num2 = num1 + ran
        } else {num2 = num1 - ran}
        
      } else {
        num2 = this.random.generateRandom(num[0])
      }

      this.values.push({x: num1, y: num2})
    }
    this.undo_list.push({index: this.total, qty: num[1]})
    this.total += num[1]
    
  }

  clearAll(){    
    this.values = []
    this.complete = 0
    this.total = 0
  }

  undo_click(){
    if (this.values.length){
      const undo_item = this.undo_list.pop();
      if (undo_item !== undefined) {        
        this.values.splice(undo_item.index, undo_item.qty)
        this.total -= undo_item.qty

        // update complete (if exists)
        let max = undo_item.index + undo_item.qty
        let new_complete: number[] = []
        if (this.undo_complete.length){
          for (let j of this.undo_complete){
            if (j >= undo_item.index && j < max){
              this.complete--              
            } else (new_complete.push(j))
          }
          this.undo_complete = new_complete
        }        
      }   
    }
  }
}

import { Component } from '@angular/core';

import { RandomService } from '../services/random.service';
import { HeaderComponent } from './header/header.component';
import { ChiaComponent } from './pheptoan/chia/chia.component';
import { NhanComponent } from './pheptoan/nhan/nhan.component';
import { CongComponent } from './pheptoan/cong/cong.component';
import { TruComponent } from './pheptoan/tru/tru.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/EventService';
import { WorkInterface } from '../shared/interface/workinterface';
import { UndoInterface } from '../shared/interface/undointerface';

const keys = ['chia', 'nhan', 'cong', 'tru'];
const createDict = () => {
  let values: any = {};
  let undo_list: any = {};
  let complete: any = {};
  let undo_complete: any = {};
  
  for (let k of keys){  
    let variable1 : WorkInterface[] = [];
    let variable2 : UndoInterface[] = [];
    let variable3 : number[] = [];
    let variable4 : number = 0; 
  
    values[k] = variable1;
    undo_list[k] = variable2;
    undo_complete[k] = variable3;
    complete[k] = variable4;
  };

  return [values, undo_list, undo_complete, complete]
}



@Component({
  selector: 'baitaptoan',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent, ChiaComponent, NhanComponent, CongComponent, TruComponent
  ],
  template: `
    <div class="container p-3 shadow mb-5 bg-body rounded" >
      <div class="mb-0 sticky-top" id="#">
        <app-header
          (generate_click)="generateList($event)"
          (clearall_click)="clearAll()"
          (undo_click)="undo_click()"
          [pheptoan]="pheptoan"
          (radio_change)="pheptoan = $event"
        ></app-header>
        <div class="my-3">Hoàn thành: {{ complete[pheptoan] }}/{{ values[pheptoan].length }}</div>
      </div>
        
      <div class="position-relative">
        <div class="my-4 position-absolute top-0"  *ngIf=" values['chia'].length"
        [ngClass]="pheptoan==='chia'?'visible ' : 'invisible'"
        >                    
          <chia [works]="values['chia']" ></chia>
        </div>

        <div class="my-4 position-absolute top-0"  *ngIf=" values['nhan'].length"
        [ngClass]="pheptoan==='nhan'?'visible ' : 'invisible'"
        >       
          <nhan [works]="values['nhan']"></nhan>
        </div>

        <div class="my-4 position-absolute top-0" *ngIf="values['cong'].length"
        [ngClass]="pheptoan==='cong'?'visible ' : 'invisible'"
        > 
          <cong [works]="values['cong']"></cong>
        </div>

        <div class="my-4 position-absolute top-0" *ngIf="values['tru'].length"
        [ngClass]="pheptoan==='tru'?'visible ' : 'invisible'"
        > 
          <tru [works]="values['tru']"></tru>
        </div>
      </div>
    </div>
  `,
  styleUrl: './baitaptoan.component.css'
})
export class BaitaptoanComponent {
  pheptoan: string = 'chia'

  mylist: any[] = createDict()
  values: any = this.mylist[0]
  undo_list: any = this.mylist[1]
  undo_complete: any = this.mylist[2]
  complete: any = this.mylist[3]
    
  constructor(
    private random: RandomService, 
    private route: ActivatedRoute, 
    private eventService: EventService
  ){      
      this.eventService.emitt('updateTitle', this.route.snapshot.title)
      this.eventService.listen('updateToanTinh', (comp: any)=> {
        // console.log(comp)
        if (comp.pass){
          this.complete[this.pheptoan]++
          this.undo_complete[this.pheptoan].push(comp.id)
        } else {
          this.complete[this.pheptoan]-- ;
          let index = this.undo_complete[this.pheptoan].indexOf(comp.id)
          this.undo_complete[this.pheptoan].splice(index, 1)
        }
      })      
  }


  generateList(num: any){    
    for (let x=0; x < num[2]; x++) {            
      let num1 = this.random.generateRandom(num[0]);
      let num2 = this.random.generateRandom(num[1])     
      this.values[this.pheptoan].push({x: num1, y: num2})    
    }      

    this.undo_list[this.pheptoan].push({
      index: this.values[this.pheptoan].length ? this.values[this.pheptoan].length - num[2] : 0, 
      qty: num[2]})
  }

  clearAll(){    
    for (let k of keys){
      this.values[k] = []
      this.undo_list[k] = []
      this.undo_complete[k] = []
      this.complete[k] = 0
    }    
  }

  undo_click(){    
    if (this.undo_list[this.pheptoan].length){
      const undo_item = this.undo_list[this.pheptoan].pop();
      if (undo_item !== undefined) {        
        this.values[this.pheptoan].splice(undo_item.index, undo_item.qty)

        // update complete (if exists)
        let max = undo_item.index + undo_item.qty
        let new_complete: number[] = []
        if (this.undo_complete[this.pheptoan].length){
          for (let j of this.undo_complete[this.pheptoan]){
            if (j >= undo_item.index && j < max){
              this.complete[this.pheptoan]--              
            } else (new_complete.push(j))
          }
          this.undo_complete[this.pheptoan] = new_complete
        }        
      }   
    }
  }
}

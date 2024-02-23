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
      </div>
        

      <div class="position-relative">
        <div class="my-4 position-absolute top-0"  *ngIf=" value_dict['chia'][0].length"
        [ngClass]="pheptoan==='chia'?'visible ' : 'invisible'"
        >          
          <chia
            [sobichia_list]="value_dict['chia'][0]"
            [sochia_list]="value_dict['chia'][1]"
          ></chia>
        </div>

        <div class="my-4 position-absolute top-0"  *ngIf=" value_dict['nhan'][0].length"
        [ngClass]="pheptoan==='nhan'?'visible ' : 'invisible'"
        >          
          <nhan
            [thuaso1_list]="value_dict['nhan'][0]"
            [thuaso2_list]="value_dict['nhan'][1]"
          ></nhan>
        </div>

        <div class="my-4 position-absolute top-0" *ngIf="value_dict['cong'][0].length"
        [ngClass]="pheptoan==='cong'?'visible ' : 'invisible'"
        >          
          <cong
            [sohang1_list]="value_dict['cong'][0]"
            [sohang2_list]="value_dict['cong'][1]"
          ></cong>
        </div>

        <div class="my-4 position-absolute top-0" *ngIf="value_dict['tru'][0].length"
        [ngClass]="pheptoan==='tru'?'visible ' : 'invisible'"
        >          
          <tru
            [sobitru_list]="value_dict['tru'][0]"
            [sotru_list]="value_dict['tru'][1]"
          ></tru>
        </div>
      </div>
    
    </div>
  `,
  styleUrl: './baitaptoan.component.css'
})
export class BaitaptoanComponent {
  pheptoan: string = 'chia'

  value_dict: any = {
    'chia': [[], [], 0],
    'nhan': [[], [], 0],
    'cong': [[], [], 0],
    'tru': [[], [], 0]
  }
  undo_dict: any = {'chia': [], 'nhan': [], 'cong': [], 'tru': []};
  
  constructor(
    private random: RandomService, 
    private route: ActivatedRoute, 
    private eventService: EventService
  ){      
      this.eventService.emitt('updateTitle', this.route.snapshot.title)
      // console.log('title:', this.route.snapshot.title)
  }


  generateList(num: any){    
    for (let x=0; x < num[2]; x++) {            
      let num1 = this.random.generateRandom(num[0]);
      let num2 = this.random.generateRandom(num[1])
      
      this.value_dict[this.pheptoan][0].push(num1)
      this.value_dict[this.pheptoan][1].push(num2)    
    }    
    

    let start = this.value_dict[this.pheptoan][2];
    let stop = num[2] + this.value_dict[this.pheptoan][2];
    this.value_dict[this.pheptoan][2] += num[2]
    // console.log('start: ', start, 'stop: ', stop)

    let count_array = this.random.createRange(start, stop)    
    this.undo_dict[this.pheptoan].push(count_array)
    // console.log(this.value_dict[this.pheptoan])
  }

  clearAll(){
    this.value_dict['chia']= [[], [], 0]; 
    this.value_dict['nhan'] = [[], [], 0];
    this.value_dict['cong'] = [[], [], 0]
    this.value_dict['tru'] = [[], [], 0]
  }

  undo_click(){
    if (this.undo_dict[this.pheptoan].length) {
      const remove_index = this.undo_dict[this.pheptoan].pop();
      let list_1 = this.value_dict[this.pheptoan][0];
      let list_2 = this.value_dict[this.pheptoan][1];
      
      let new_list_1: number[] = [];
      let new_list_2: number[] = [];

      for (let x = 0; x < list_1.length; x++) {
        if (!remove_index.includes(x)) {
          new_list_1.push(list_1[x])
          new_list_2.push(list_2[x])
        }       
      }
            
      this.value_dict[this.pheptoan][0] = new_list_1;
      this.value_dict[this.pheptoan][1] = new_list_2;
      this.value_dict[this.pheptoan][2] -= remove_index.length      
    } 
  }
}

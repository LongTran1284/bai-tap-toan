import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/EventService';
import { HeaderComponent } from './header-compare/header-compare.component';
import { SimpleCompareComponent } from './simple-compare/simple-compare.component';
import { RandomService } from '../services/random.service';
import { ComplexCompareComponent } from './complex-compare/complex-compare.component';
import { CommonModule } from '@angular/common';

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
          (radio_change)="level = $event"
        ></sosanh-header>
      </div>
      <div class="mt-3">
        <div *ngIf="level==='simple'">
          <simple-compare
            [num_list_1]="num_list_1"
            [num_list_2]="num_list_2"
          ></simple-compare>
        </div>
        <div *ngIf="level==='complex'">
          <complex-compare
            [num_list_1]="num_list_1"
            [num_list_2]="num_list_2"
          ></complex-compare>
        </div>
      </div>
    </div>
    
  `,
  styleUrl: './toansosanh.component.css'
})
export class ToansosanhComponent {
  num_list_1: any[] = [];
  num_list_2: any[] = []
  level: string = 'complex'
  
  constructor(
    private route: ActivatedRoute, 
    private eventService: EventService,
    private random: RandomService
    ){
    this.eventService.emitt('updateTitle', this.route.snapshot.title)
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

      this.num_list_1.push(num1);
      this.num_list_2.push(num2);
    }
    
  }

  clearAll(){

  }

  undo_click(){

  }
}

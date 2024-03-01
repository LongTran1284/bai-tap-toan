import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventService } from '../services/EventService';
import { RandomService } from '../services/random.service';

// import { HeaderTilethucComponent } from './header-tilethuc/header-tilethuc.component';
import { BtnGroupComponent } from '../shared/btn-group/btn-group.component';
import { DivisorService } from '../services/divisor.service';
import { WorkTilethucComponent } from './work-tilethuc/work-tilethuc.component';
import { WorkInterface } from '../shared/interface/workinterface'; 
import { UndoInterface } from '../shared/interface/undointerface';

@Component({
  selector: 'app-tilethuc',
  standalone: true,
  imports: [
    // HeaderTilethucComponent,
    // CommonModule
    BtnGroupComponent,
    WorkTilethucComponent
  ],
  template: `
    <div class="container-fluid p-3 shadow mb-5 bg-body rounded">      
      <div class="container mb-3">
        <btn-group
          (generate_click)="createNumList()"
          (clearall_click)="clearAll()"
          (undo_click)="undo_click()"          
        ></btn-group>
        <div class="my-3">Hoàn thành: {{ complete }}/{{ total }}</div>
      </div>
      
      <div class="mt-3">
        <div >
          <work-tilethuc [works]="values"></work-tilethuc>
        </div>
      </div>
    </div>
  `,
  styleUrl: './tilethuc.component.css'
})
export class TilethucComponent {  
  digit_number: number = 2 // number has 2 digits
  values: WorkInterface[] = [];
  total: number = 0
  complete: number = 0  
  undo_list: UndoInterface[] = []
  undo_complete: number[] = []

  constructor(
    private random: RandomService, 
    private route: ActivatedRoute, 
    private eventService: EventService,
    private dvs: DivisorService,
  ){      
      this.eventService.emitt('updateTitle', this.route.snapshot.title)
      this.eventService.listen('updateTiLeThuc', (comp: any)=> {
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

  createNumList(){
    const max = this.random.maxNumDigit(this.digit_number)
    const min = this.random.minNumDigit(this.digit_number)
    const sl = 3
    for (let x=0; x < sl; x++) {        
      let x_value: number = this.random.ranum(min, max)
      let y_value: number = this.random.ranum(2,10)
      let tinh = this.random.randomValue(['+', '-'])
      
      // find divisors of x_value, if not, change the value of x_value. Make sure x_value is not a prime!!
      let x_divisors = this.dvs.divisors(x_value)
      while (x_divisors.length === 0) {
        x_value++;
        x_divisors = this.dvs.divisors(x_value)
      }

      // choose a random divisor in x_divisors. Meets some conditions
      let divisor = this.random.randomValue(x_divisors)
      while ( y_value * divisor > 100 ||  y_value * divisor === x_value) {
        divisor = this.random.randomValue(x_divisors)
      }
            
      x_value *= this.random.plusOrMinus()
      y_value *= this.random.plusOrMinus() * divisor

      // find the greatest common divisor of x_value and y_value
      let gcd: number = this.dvs.gcd(x_value, y_value)
      let result = eval(`${x_value} ${tinh} ${y_value}`)
      let congtru = `x ${tinh} y = ${result}`      

      this.values.push({
          x: x_value,
          y: y_value,
          pheptinh: congtru,
          phanso_x: x_value/gcd,
          phanso_y: y_value/gcd
      })
    }
    console.log(this.values)
    this.undo_list.push({index: this.total, qty: sl})
    this.total += sl    
  }
  

  clearAll(){
    this.values = []
    this.undo_list = []
    this.total = 0
    this.complete = 0
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

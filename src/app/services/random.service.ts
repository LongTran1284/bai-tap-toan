import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {
  title: string = ''

  constructor() { }

  generateRandom(digit:number) {
    const min = Math.pow(10, digit-1) > 1 ? Math.pow(10, digit-1) : 2;
    const max = Math.pow(10, digit);
    return this.ranum(min, max);
  }

  superRandom(digit:number){
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    const min = Math.pow(10, digit-1) > 1 ? Math.pow(10, digit-1) : 2;
    const max = Math.pow(10, digit);
    return this.ranum(min, max) * plusOrMinus;
  }

  plusOrMinus(): number {
    return Math.random() < 0.5 ? -1 : 1;
  }

  maxNumDigit(digit: number): number {
    return Math.pow(10, digit);
  }

  minNumDigit(digit: number): number {
    return Math.pow(10, digit-1) > 1 ? Math.pow(10, digit-1) : 2;
  }

  ranum(min: number, max: number){
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  randomValue(vlist: any[]){
    return vlist[this.ranum(0, vlist.length)]  
  }

  generateRandomList(digit:number, qty: number) {
    const min = Math.pow(10, digit-1) > 1 ? Math.pow(10, digit-1) : 2;
    const max = Math.pow(10, digit);
    let values: number[] = []
    for (let x=0; x<qty; x++){
      values.push(Math.floor(Math.random() * (max - min) ) + min)
    }
    return values;
  }

  createRange(start: number, stop: number) {
    const range = Array.from({ length: stop - start }, (_, i) => start + i)
    return range
  }

  convertList(num: number){
    // convert number to list of number
    let vlist: any[] = []

    for (let i of String(num)){
        vlist.push(i)
    }
    return vlist
  }

  convertNullList(num: number){
    // num is the length of list
    let vlist: any[] = []
    // let myarray = this.createRange(0, num)

    for (let i of Array(num)){
      vlist.push('')        
    }
    return vlist
}

  changeTitle(newTitle: string){
    // this.title = newTitle
    return newTitle
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DivisorService {

  constructor() { }

  // find the greatest common divisor (GCD) of 2 integers
  gcd(a: number, b: number): number {
    // First, we take the remainder between the division of a and b:
    const r = a % b
  
    // If the remainder is equal to zero, it means that we already found the
    // greatest common divisor, therefore, we return b:
    if (r === 0) {
      return b
    }
  
    // If the remainder is not equal to 0, we call the function again
    // with the new values for a and b:
    return this.gcd(b, a % b)
  }

  divisors(num: number): number[] {
    if (num < 0) num = -1 * num
    var result = [];
    for(let i = 2; i < num; i++) {
      if(num % i == 0) {
        result.push(i)
      }
    }    
    return result;
  };

  find_max_divisor(num1: number[], num2: number[]){
    let result: number = 1
    // let len: number = Math.min(num1.length, num2.length)
    console.log(num1, num2)
    for (let n of num1){
      if (num2.includes(n)){
        console.log(n)
        result *= n
      }
    }
    return result
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorGeneratorService {
  private readonly letters = '0123456789ABCDEF';

  constructor() { }

  public getRandomColor() {
    let color = "#";
    for (var i = 0; i < 6; i++) {

      color += this.letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

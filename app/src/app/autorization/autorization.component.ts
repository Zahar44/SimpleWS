import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorGeneratorService } from '../colors/color.generator.service';
import { AutorizationService } from './autorization.service';

@Component({
  selector: 'app-autorization',
  templateUrl: './autorization.component.html',
  styleUrls: ['./autorization.component.css']
})
export class AutorizationComponent implements OnInit {
  title = 'Autorization';
  name: string = '';
  password: string = '';

  buttonStyle: any = { 'background-color': 'black' };

  private buttonInterval!: any;

  constructor(
    private readonly autorizationService: AutorizationService,
    private readonly colorGenerator: ColorGeneratorService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    
  }

  @Input() enter() {
    this.autorizationService.setUser({ name: this.name });
  }

  onKeydown(event: Event) {
    this.enter();
    this.router.navigate(['chat']);
  }

  changeStyle(event: Event) {
    if (event.type === 'mouseout') {
      this.buttonStyle['background-color'] = '#acb';
      console.log('mouseout');
      clearInterval(this.buttonInterval);
    }
    if (event.type === 'mouseover') {
      this.buttonInterval = setInterval(() => {
        console.log('mouseover');
        this.buttonStyle['background-color'] = this.colorGenerator.getRandomColor();
      }, 150);
    }
  }
}
